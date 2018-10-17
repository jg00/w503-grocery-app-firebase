

var database = firebase.database();

// Add categories
$("#btnAddGroceryCategory").click(function() {
    addCategory() 
});

function addCategory() {
    let groceryCategoryVal = $("#txtGroceryCategory").val();
    
    database.ref('GroceryCategory/' + groceryCategoryVal).set({name: groceryCategoryVal});
}



// Add items
$("#btnAddGroceryItem").click(function() {
    addItemsToCategory();
});

function addItemsToCategory() {
    let groceryCategoryVal = $("#txtGroceryCategory").val();
    let groceryItemVal = $("#txtGroceryItem").val();
    
    database.ref("GroceryCategory/" + groceryCategoryVal + "/Items")

        .set({item: groceryItemVal});
  
    
}
