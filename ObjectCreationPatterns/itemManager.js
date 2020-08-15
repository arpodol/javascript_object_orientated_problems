//item creator
//ItemManager
//ReportManager

ItemManager = (function(){
  function itemCreator(name, category, quantity){
    if (isValidInput(name, category, quantity)){
      let skuCode = name.replace(' ', '').substring(0,3) + category.substring(0,2) ;
      return {
        skuCode: skuCode.toUpperCase(),
        itemName: name,
        category: category,
        quantity: quantity
      }
    } else {
      return {notValid: true}
    }
  }

  function isValidInput(name, category, quantity){
    if (name === undefined || category === undefined || quantity === undefined){
      return false;
    }

    if (name.replace(' ', '').length < 5){
      return false;
    }

    if (category.length < 5 || category.match(/\s/)){
      return false;
    }
    return true;
  }


  return {
    create: function(name, category, quantity){
      var item = itemCreator(name, category, quantity);
      if (item['notValid']){
        return false;
      } else {
        this.items.push(item);
        return true;
      }
    },
    items: [],

    update: function (sku, properties){
      this.items.forEach(item => {
        console.log(item)
        if (item.skuCode === sku){
          Object.keys(properties).forEach(property => {
            item[property] = properties[property];
          })
        }
      })
    },

    inStock: function(){
      return this.items.filter(item => item.quantity > 0);
    },

    itemsInCategory: function(categoryQuery){
      return this.items.filter(item => item.category === categoryQuery)
    },

    delete: function(sku){
      var index = this.items.findIndex(item => item.skuCode === sku);
      this.items.splice(index, 1);
    },
  }
})()

ReportManager = (function(){
  return {
    init: function(itemManager){
      this.itemManager = itemManager;
    },

    reportInStock: function(){
      this.itemManager.items.forEach(function(item){
        if(item.quantity > 0){
          console.log(item.itemName)
        }
      })
    },

    createReporter: function(sku){
      let itemManager = this.itemManager;
      return {
        itemInfo: function(){
          console.log(itemManager.items.filter(item => item.skuCode === sku))
        }
      }
    },
  }
})()



ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

var kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
