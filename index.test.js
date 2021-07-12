const {sequelize} = require("./db");
const {Restaurant, Menu, Item} = require("./index")

describe('Restaurant Database', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create restaurant', async() => {
        const testRestaurant = await Restaurant.create({name: 'Uni Sushi'})
        expect(testRestaurant.name).toBe('Uni Sushi')
    })

    test('can create menu', async() => {
        const testMenu = await Menu.create({name: 'Basic Rolls'})
        expect(testMenu.name).toBe('Basic Rolls')
    })

    test('can create item', async() => {
        const testItem = await Item.create({name: 'Philadelphia Roll'})
        expect(testItem.name).toBe('Philadelphia Roll')
    })

    test('restaurants have menus', async() => {
        const testRestaurant = await Restaurant.create({name: 'Uni Sushi'})
        const testMenu = await Menu.create({name: 'Basic Rolls'})
        await testRestaurant.addMenu(testMenu)
        const menus = await testRestaurant.getMenus();
        expect(menus[0].name).toBe('Basic Rolls');
    })

    test('menus have items', async() => {
        const testMenu = await Menu.create({name: 'Basic Rolls'})
        const testItem = await Item.create({name: 'Philadelphia Roll', price: 6.99})
        await testMenu.addItem(testItem)
        const items = await testMenu.getItems();
        expect(items[0].name).toBe('Philadelphia Roll')
        expect(items[0].price).toBe(6.99)
    })

})