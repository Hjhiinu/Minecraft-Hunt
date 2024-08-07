// Classes needed for building recipes schema.
const $RecipeSchema = Java.loadClass('dev.latvian.mods.kubejs.recipe.schema.RecipeSchema')
const $RecipeComponentBuilder = Java.loadClass('dev.latvian.mods.kubejs.recipe.component.RecipeComponentBuilder')

/**
 * @author M1hono
 * @description This script is a test of building recipes schema.
 */
StartupEvents.recipeSchemaRegistry((event) => {
    const { components } = event

    event.register(
        'farmersdelight:cutting',
        new $RecipeSchema(
            components.get('outputItemArray')().key('result'),
            components.get('inputItemArray')().key('ingredients'),
            components
                .get('inputItem')()
                .or(
                    new $RecipeComponentBuilder(2)
                        .add(components.get('nonBlankString')().key('type'))
                        .add(components.get('nonBlankString')().key('action'))
                        .inputRole()
                )
                .key('tool')
        )
    )

    event.register(
        'farmersdelight:cooking',
        new $RecipeSchema(
            components.get('outputItem')().key('result'),
            components.get('inputItemArray')().key('ingredients'),
            components.get('inputItem')().key('container').defaultOptional(),
            components.get('intNumber')().key('cookingtime').optional(200),
            components.get('floatNumber')().key('experience').optional(1.0),
            components.get('nonBlankString')().key('recipe_book_tab').defaultOptional()
        )
    )
})
