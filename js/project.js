function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    getApi();
    $("#recipe").on('change', function () {
        var recipeId = $("#recipe").val();
        eachrecipe(recipeId);
    })
    $("#number").html("Number of persons");
    $('#minus').on('click', function () {
        var members = $('#member').val();
        decreaseMember(members);
    });

    $('#add').on('click', function () {
        var members = $('#member').val();
        increaseMember(members);
    });
   
})


function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) =>
            chooseRecipe(data.recipes),
        error: () => console.log("errror"),
    })
}
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = ""
    allData.forEach(item => {
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $('#recipe').append(option);
}

//call the function
$('#step').hide();
$('#number').hide();
$('#ruler').hide();
$('#guest').hide();
$('#image').show();
var nbDefault=1;
function eachrecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
                loopQuan = item;
                getOldGuest = item.nbGuests;
                showRecipe(item.iconUrl, item.name),
                showIngredient(item.ingredients),
                showStep(item.instructions);
                $('#member').val(item.nbGuests);
                guestDefault = $('#member').val();
        }
    })
    $('#guest').show();
    $('#ruler').show();
    $('#number').show();
    $('#image').hide();
    $('#step').show();
}

function compute(guestNew) {
    var results;
    var newQuanlity;
    var outPut = "";
    loopQuan.ingredients.forEach(item => {
        var {quantity, iconUrl, name, unit} = item;
        newQuanlity = quantity * guestNew;
        results = newQuanlity / getOldGuest;
       
        outPut += `
        <div class="col-4"></div>
            <div class="col-6">
            <tr class="shadow-lg">
                <td><img src="${iconUrl}" class="img-thumbnail" width="50px"></td>
                <td>${newQuanlity}</td>
                <td>${unit[0]}</td>
                <td>${name}</td>
            </tr>
            </div>
       <div class="col-4"></div>
    `;
    });
     $("#recipe-results").html(outPut);
}
function showRecipe(img, name) {
    var result = "";
    result += `
        <div class="row">
            <div class="col-3"></div> 
            <div class="col-3 mt-1 text-black shadow-lg"><h2>${name} </h2></div> 
            <div class="col-3"><img src="${img}" class="img-thumbnail shadow-lg" width="70%"></div>
            <div class="col-3"></div>  
        </div>
    `;
    $("#recipe-result").html(result);
}
function showIngredient(ing) {
    $('#ingredients').html("Ingredients")
    var results = "";
    ing.forEach(item => {
        results += `
            <div class="col-4"></div>
            <div class="col-6">
            <tr class="shadow-lg">
                <td><img src="${item.iconUrl}" class="img-thumbnail" width="50px"></td>
                <td>${item.quantity}</td>
                <td>${item.unit[0]}</td>
                <td>${item.name}</td>
            </tr>
            </div>
       
       <div class="col-4"></div>
       
       `;
    })
    $("#recipe-results").html(results)
}

//cut step
function showStep(step) {
    $("#instructions").html("Instructions");
    var getStep = "";
    var steps = step.split("<step>")
    for (let i = 1; i < steps.length; i++) {
        getStep += `
            <h5 class="shadow-lg"></strong>Step ${i}</strong></h5>
            <p>${steps[i]}</p>
        `;
    }
    $("#step").html(getStep);
}
// //for add number
function decreaseMember(minus) {
    var member = parseInt(minus) - 1;
    if (member >= 1) {
        $('#member').val(member);
        compute(member);
    }
}
function increaseMember(add) {
    var members = parseInt(add)+1;
    if (members <= 15) {
        $('#member').val(members);
        compute(members);
    }
}
