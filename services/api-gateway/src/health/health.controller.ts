import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class HealthController {
  constructor() {}

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      version: '1.0.0',
    };
  }

  @Get('services')
  getServices() {
    return {
      services: [
        { name: 'user-service', port: 3001, basePath: '/users', requiresAuth: true },
        { name: 'faq-service', port: 3002, basePath: '/faqs', requiresAuth: false },
        { name: 'location-service', port: 3003, basePath: '/locations', requiresAuth: false },
        { name: 'accommodation-service', port: 3004, basePath: '/accommodations', requiresAuth: false },
        { name: 'playlist-service', port: 3005, basePath: '/playlists', requiresAuth: false },
        { name: 'notification-service', port: 3006, basePath: '/notifications', requiresAuth: false },
      ],
    };
  }

  @Get()
  getInfo() {
    return {
      name: 'Wedding Platform API Gateway',
      version: '1.0.0',
      description: 'Central entry point for all microservices',
      endpoints: {
        health: '/health',
        services: '/services',
        auth: '/auth/*',
        users: '/users/*',
        faqs: '/faqs/*',
        locations: '/locations/*',
        accommodations: '/accommodations/*',
        playlists: '/playlists/*',
        notifications: '/notifications/*',
      },
    };
  }
} 