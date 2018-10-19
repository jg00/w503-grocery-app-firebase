
const database = firebase.database();
const categoriesRef = database.ref('categories');


// Add category
$("#btnAddCategory").click(function() {
    let txtCategory = $("#txtCategory").val();
    let category = { title: txtCategory, zipCode: "77777"}

    if (txtCategory) {
        addCategory(category) 
        $("#txtExists").show();
    }
    else {
        console.log("test")
        $("#txtExists").hide();
    }
});


function addCategory(category) {

    let refCheck = categoriesRef.child(category.title);

    refCheck.once("value") 
      .then(function(snapshot) {

        if (snapshot.exists()) {
            $("#txtExists").text("Category Exists")
        }
        else {
            categoriesRef.child(category.title).set(category)
            $("#txtExists").empty();
        }    
      });
}


// Configure changes
function configureObservers() {

    categoriesRef.on('value',function(snapshot){
  
        categories = []
  
        snapshot.forEach(function(childSnapshot){
            categories.push(childSnapshot.val())
        })

        displayCategories(categories)
    })
  }

configureObservers()


// Display all categories and items
function displayCategories(categories) {
  
    let liItem2 = ""
    let liItem3 = ""
    let liCombined = ""

    for (let key of categories) {

        let category = key.title;

        liItem2 = ""
        liItem2 = `<ul>
                        <div class="divClassCategoryHeader">
                            <p><span class="classCategory">${category}</span></p>
                        </div>`

        liItem3 = ""
        for (let item in key.items) {
            
            let listItem = item;
                        
            liItem3 += `<li class="liItem">
                            <button type="button" onclick="removeItem(this)">Remove</button>
                            <span class="classItem">${listItem}</span>
                        </li>`
        }

        liCombined += liItem2 + liItem3 + '</ul>'
    }

    ulList.innerHTML = liCombined;
}


// Add item
$("#btnAddItem").click(function() {
    let txtCategory = $("#txtCategory").val();
    let txtItem = $("#txtItem").val();

    let item = { title: txtItem, quantity: 5 }
    addGroceryItem(txtCategory, item) 
});


function addGroceryItem(txtCategory, item) {

    let itemsRef = categoriesRef.child(txtCategory).child("items")
    itemsRef.child(item.title).set(item)
    resetTextBoxes()
}


// Clear textboxes for next item to add
function resetTextBoxes(){
    $("#txtItem").val('');
    $("#txtExists").val('');
}


// Remove item
function removeItem(sender) {

    let classCategory = $(sender).parent().parent().find('.classCategory').text();

    let itemCategory = $(sender).parent().find('.classItem').text();

    let itemsRef = categoriesRef.child(classCategory).child("items")
    itemsRef.child(itemCategory).remove()
}

