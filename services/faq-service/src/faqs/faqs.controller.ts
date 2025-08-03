import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { QueryFaqDto } from './dto/query-faq.dto';
import { FaqCategory } from './schemas/faq.schema';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  /**
   * Créer une nouvelle FAQ
   * POST /faqs
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFaqDto: CreateFaqDto) {
    // Pour les tests, on utilise un userId fixe
    return this.faqsService.create(createFaqDto, 'test-user-id');
  }

  /**
   * Récupérer toutes les FAQ avec filtres
   * GET /faqs
   */
  @Get()
  findAll(@Query() queryDto: QueryFaqDto) {
    return this.faqsService.findAll(queryDto);
  }

  /**
   * Récupérer une FAQ par ID
   * GET /faqs/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(id);
  }

  /**
   * Mettre à jour une FAQ
   * PATCH /faqs/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(id, updateFaqDto, 'test-user-id');
  }

  /**
   * Supprimer une FAQ
   * DELETE /faqs/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.faqsService.remove(id, 'test-user-id');
  }

  /**
   * Rechercher des FAQ par texte
   * GET /faqs/search?q=query&limit=10
   */
  @Get('search')
  search(@Query('q') query: string, @Query('limit') limit: string = '10') {
    return this.faqsService.search(query, parseInt(limit));
  }

  /**
   * Récupérer les FAQ par catégorie
   * GET /faqs/category/:category?limit=20
   */
  @Get('category/:category')
  findByCategory(
    @Param('category') category: FaqCategory,
    @Query('limit') limit: string = '20'
  ) {
    return this.faqsService.findByCategory(category, parseInt(limit));
  }

  /**
   * Récupérer les FAQ populaires
   * GET /faqs/popular?limit=10
   */
  @Get('popular')
  getPopular(@Query('limit') limit: string = '10') {
    return this.faqsService.getPopular(parseInt(limit));
  }

  /**
   * Marquer une FAQ comme utile
   * POST /faqs/:id/helpful
   */
  @Post(':id/helpful')
  markHelpful(@Param('id') id: string) {
    return this.faqsService.markHelpful(id);
  }

  /**
   * Marquer une FAQ comme non utile
   * POST /faqs/:id/not-helpful
   */
  @Post(':id/not-helpful')
  markNotHelpful(@Param('id') id: string) {
    return this.faqsService.markNotHelpful(id);
  }

  /**
   * Récupérer les statistiques des FAQ
   * GET /faqs/stats
   */
  @Get('stats')
  getStats() {
    return this.faqsService.getStats();
  }

  /**
   * Récupérer les catégories disponibles
   * GET /faqs/categories
   */
  @Get('categories')
  getCategories() {
    return {
      categories: Object.values(FaqCategory).map(category => ({
        value: category,
        label: this.getCategoryLabel(category),
      })),
    };
  }

  /**
   * Helper pour obtenir les labels des catégories
   */
  private getCategoryLabel(category: FaqCategory): string {
    const labels = {
      [FaqCategory.GENERAL]: 'Général',
      [FaqCategory.WEDDING_PLANNING]: 'Planification du mariage',
      [FaqCategory.VENUE]: 'Lieu de réception',
      [FaqCategory.CATERING]: 'Traiteur',
      [FaqCategory.MUSIC]: 'Musique',
      [FaqCategory.PHOTOGRAPHY]: 'Photographie',
      [FaqCategory.TRANSPORT]: 'Transport',
      [FaqCategory.ACCOMMODATION]: 'Hébergement',
      [FaqCategory.GUESTS]: 'Invités',
      [FaqCategory.LEGAL]: 'Aspects légaux',
    };
    return labels[category] || category;
  }
} 