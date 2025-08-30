'use strict';

/**
 * learning-content service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::learning-content.learning-content');
