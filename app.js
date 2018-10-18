
const database = firebase.database();
const categoriesRef = database.ref('categories');


// Add categories
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


// Configure the value event generated from firebase database
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


function displayCategories(categories) {

    let liItem2 = ""
    let liItem3 = ""
    let liCombined = ""

    for (let key of categories) {

        let category = key.title;

        liItem2 = ""
        liItem2 = `<li>
                        <span class="classCategory">${category}</span>
                  </li>`

        liItem3 = ""
        for (let item in key.items) {
            
            let listItem = item;

            liItem3 += `<ul id="ulItemParent">
                            <li>
                                <span class="classItem">${listItem}</span>
                                <button type="button" onclick="removeItem(this)">Remove</button>
                            </li>
                        </ul>`
        }

        liCombined += liItem2 + liItem3
    }

    ulList.innerHTML = liCombined;
}


$("#btnAddItem").click(function() {
    let txtCategory = $("#txtCategory").val();
    let txtItem = $("#txtItem").val();
    
    let item = { title: txtItem, quantity: 5 }
    addGroceryItem(txtCategory, item) 
});


// Add item to category
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


function removeItem(sender) {

    // Section to try to remove item from database but in progress
    let classCategory = $(sender).parent().parent().parent().find('.classCategory').text(); 
    let itemCategory = $(sender).parent().find('.classItem').text(); // works

    // REemove from front end
    $(sender).parent().remove();
}
