'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findOneByCode(ctx) {
        const { code } = ctx.params;
        const res = await strapi.services.feedbacks.findOne({ code: code }); 
        return res
    },
};
