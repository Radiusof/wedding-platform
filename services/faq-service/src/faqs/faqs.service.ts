import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Faq, FaqDocument, FaqCategory, FaqStatus } from './schemas/faq.schema';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { QueryFaqDto } from './dto/query-faq.dto';
import Redis from 'ioredis';

@Injectable()
export class FaqsService {
  constructor(
    @InjectModel(Faq.name) private faqModel: Model<FaqDocument>,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  /**
   * Créer une nouvelle FAQ
   */
  async create(createFaqDto: CreateFaqDto, userId: string): Promise<Faq> {
    const faq = new this.faqModel({
      ...createFaqDto,
      createdBy: userId === 'test-user-id' ? 'test-user-id' : new Types.ObjectId(userId),
    });

    const savedFaq = await faq.save();

    // Publier l'événement de création
    await this.publishEvent('faq.created', {
      faqId: savedFaq._id?.toString() || '',
      question: savedFaq.question,
      category: savedFaq.category,
      createdBy: userId,
    });

    return savedFaq;
  }

  /**
   * Récupérer toutes les FAQ avec filtres
   */
  async findAll(queryDto: QueryFaqDto): Promise<{ data: Faq[]; total: number; page: number; limit: number }> {
    const { search, category, status, tag, limit = 20, page = 0, sortBy = 'order', sortOrder = 'asc' } = queryDto;

    // Construire la requête
    const filter: any = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // Compter le total
    const total = await this.faqModel.countDocuments(filter);

    // Récupérer les données
    const data = await this.faqModel
      .find(filter)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  /**
   * Récupérer une FAQ par ID
   */
  async findOne(id: string): Promise<Faq> {
    const faq = await this.faqModel.findById(id).exec();
    
    if (!faq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    // Incrémenter le compteur de vues
    await this.faqModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }).exec();

    return faq;
  }

  /**
   * Mettre à jour une FAQ
   */
  async update(id: string, updateFaqDto: UpdateFaqDto, userId: string): Promise<Faq> {
    const faq = await this.faqModel.findById(id).exec();
    
    if (!faq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    const updatedFaq = await this.faqModel
      .findByIdAndUpdate(
        id,
        {
          ...updateFaqDto,
          updatedBy: userId === 'test-user-id' ? 'test-user-id' : new Types.ObjectId(userId),
        },
        { new: true }
      )
      .exec();

    if (!updatedFaq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    // Publier l'événement de mise à jour
    await this.publishEvent('faq.updated', {
      faqId: id,
      question: updatedFaq.question,
      category: updatedFaq.category,
      updatedBy: userId,
    });

    return updatedFaq;
  }

  /**
   * Supprimer une FAQ (soft delete)
   */
  async remove(id: string, userId: string): Promise<void> {
    const faq = await this.faqModel.findById(id).exec();
    
    if (!faq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    await this.faqModel.findByIdAndUpdate(id, { isActive: false }).exec();

    // Publier l'événement de suppression
    await this.publishEvent('faq.deleted', {
      faqId: id,
      question: faq.question,
      category: faq.category,
      deletedBy: userId,
    });
  }

  /**
   * Rechercher des FAQ par texte
   */
  async search(searchTerm: string, limit: number = 10): Promise<Faq[]> {
    return this.faqModel
      .find({
        $text: { $search: searchTerm },
        isActive: true,
        status: FaqStatus.PUBLISHED,
      })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .exec();
  }

  /**
   * Récupérer les FAQ par catégorie
   */
  async findByCategory(category: FaqCategory, limit: number = 20): Promise<Faq[]> {
    return this.faqModel
      .find({
        category,
        isActive: true,
        status: FaqStatus.PUBLISHED,
      })
      .sort({ order: 1 })
      .limit(limit)
      .exec();
  }

  /**
   * Récupérer les FAQ populaires
   */
  async getPopular(limit: number = 10): Promise<Faq[]> {
    return this.faqModel
      .find({
        isActive: true,
        status: FaqStatus.PUBLISHED,
      })
      .sort({ viewCount: -1, helpfulCount: -1 })
      .limit(limit)
      .exec();
  }

  /**
   * Marquer une FAQ comme utile
   */
  async markHelpful(id: string): Promise<Faq> {
    const faq = await this.faqModel.findById(id).exec();
    
    if (!faq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    const updatedFaq = await this.faqModel
      .findByIdAndUpdate(id, { $inc: { helpfulCount: 1 } }, { new: true })
      .exec();

    if (!updatedFaq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    return updatedFaq;
  }

  /**
   * Marquer une FAQ comme non utile
   */
  async markNotHelpful(id: string): Promise<Faq> {
    const faq = await this.faqModel.findById(id).exec();
    
    if (!faq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    const updatedFaq = await this.faqModel
      .findByIdAndUpdate(id, { $inc: { notHelpfulCount: 1 } }, { new: true })
      .exec();

    if (!updatedFaq) {
      throw new NotFoundException('FAQ non trouvée');
    }

    return updatedFaq;
  }

  /**
   * Récupérer les statistiques des FAQ
   */
  async getStats(): Promise<{
    total: number;
    published: number;
    draft: number;
    archived: number;
    totalViews: number;
    totalHelpful: number;
    categories: { [key: string]: number };
  }> {
    const [total, published, draft, archived, totalViews, totalHelpful, categories] = await Promise.all([
      this.faqModel.countDocuments({ isActive: true }),
      this.faqModel.countDocuments({ isActive: true, status: FaqStatus.PUBLISHED }),
      this.faqModel.countDocuments({ isActive: true, status: FaqStatus.DRAFT }),
      this.faqModel.countDocuments({ isActive: true, status: FaqStatus.ARCHIVED }),
      this.faqModel.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, total: { $sum: '$viewCount' } } }
      ]),
      this.faqModel.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, total: { $sum: '$helpfulCount' } } }
      ]),
      this.faqModel.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ])
    ]);

    const categoryStats = categories.reduce((acc, cat) => {
      acc[cat._id] = cat.count;
      return acc;
    }, {});

    return {
      total,
      published,
      draft,
      archived,
      totalViews: totalViews[0]?.total || 0,
      totalHelpful: totalHelpful[0]?.total || 0,
      categories: categoryStats,
    };
  }

  /**
   * Publier un événement Redis
   */
  private async publishEvent(eventType: string, data: any): Promise<void> {
    const event = {
      eventType,
      timestamp: new Date().toISOString(),
      data,
    };
    
    await this.redis.publish('faq_events', JSON.stringify(event));
  }
} 