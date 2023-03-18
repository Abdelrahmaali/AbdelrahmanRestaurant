


// global declerations starts

// global declerations ends 


$(document).ready(function () {
    // section 1 starts

    $("#loading").fadeOut(1000, function () {
        $(".lds-ripple").fadeOut(600, function () {
            $("body").css({ overflow: "auto" })

        })
    });
    let innwidth = $(".navtab").innerWidth()
    $(".side-menu").animate({ left: -innwidth }, 10);
    $(".open-close-icon").removeClass("fa-x");
    $(".open-close-icon").addClass("fa-align-justify");

    for (let i = 0; i < 5; i++) {
        $(".lists li").eq(i).animate({ top: 400 }, 500);


    }





    $(".open-close-icon").click(function () {
        if ($(".side-menu").css("left") == "0px") {
            closeSideMenue();
        } else {
            openSideMenue()
        }
    })



    fetchByDefoult();


    // section 1 ends 






    // section 2 starts 

    $("#search").click(function () {

        $("#searchPage").removeClass("d-none");
        $("#content").addClass("d-none");
        $("#validation").addClass("d-none");
        $("#insertrowData2").html("");
        document.getElementById("fristinput").value = "";
        document.getElementById("secondinput").value = "";


    });

    document.getElementById("fristinput").addEventListener("keyup", function (e) {
        let searchvalue = e.target.value;
        searchbyName(searchvalue);
    })


    document.getElementById("secondinput").addEventListener("keyup", function (e) {
        let searchvalue2 = e.target.value;
        console.log(searchvalue2);
        searchbyLetter(searchvalue2);
    });


    // section 2 ends 




    // section 3 starts

    $("#Categorie").click(function () {
        $("#searchPage").addClass("d-none");
        $("#validation").addClass("d-none");
        getCategoryyy()
        $("#content").removeClass("d-none");

    });


    $("#Area").click(function () {
        $("#searchPage").addClass("d-none");
        $("#validation").addClass("d-none");
        fetchArea()
        $("#content").removeClass("d-none");

    });


    $("#ingradients").click(function () {
        $("#searchPage").addClass("d-none");
        $("#validation").addClass("d-none");
        fetchIngradients()
        $("#content").removeClass("d-none");

    });

    // section 3 ends






    // section 4 starts 
    document.getElementById("redbtn").setAttribute("disabled", true)


    $("#Contact").click(function () {

        $("#validation").removeClass("d-none");
        $("#content").addClass("d-none");
        $("#searchPage").addClass("d-none");



    });



    document.getElementById("input1").addEventListener("keyup", function () {
        if (validateName() == true) {
            $("#ilert1").addClass("d-none")

        } else {
            $("#ilert1").removeClass("d-none")
            document.getElementById("redbtn").setAttribute("disabled", true)
        }



    })



    document.getElementById("input2").addEventListener("keyup", function () {
        if (validateEmail() == true) {
            $("#ilert2").addClass("d-none")

        } else {
            $("#ilert2").removeClass("d-none")
            document.getElementById("redbtn").setAttribute("disabled", true)
        }

    });



    document.getElementById("input3").addEventListener("keyup", function () {
        if (validateNumber() == true) {
            $("#ilert3").addClass("d-none")

        } else {
            $("#ilert3").removeClass("d-none");
            document.getElementById("redbtn").setAttribute("disabled", true)
        }

    });


    document.getElementById("input4").addEventListener("keyup", function () {
        if (validateAge() == true) {
            $("#ilert4").addClass("d-none");

        } else {
            $("#ilert4").removeClass("d-none");
            document.getElementById("redbtn").setAttribute("disabled", true)
        }

    })




    document.getElementById("input5").addEventListener("keyup", function () {
        if (validatePass() == true) {
            $("#ilert5").addClass("d-none");

        } else {
            $("#ilert5").removeClass("d-none");
            document.getElementById("redbtn").setAttribute("disabled", true)
        }

    });



    document.getElementById("input6").addEventListener("keyup", function () {
        if (revalidatePass() == true) {
            $("#ilert6").addClass("d-none");
            $("#redbtn").removeAttr("disabled");


        } else {
            $("#ilert6").removeClass("d-none");
            document.getElementById("redbtn").setAttribute("disabled", true)
        }

    })



    // section 4 ends





});











//  functions declerations starts
function openSideMenue() {
    $(".side-menu").animate({ left: 0 }, 1000);
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    for (let i = 0; i < 5; i++) {
        let temp = i;
        $(".lists li").eq(i).delay(temp++ * 250).animate({ top: 0 });


    }

}


function closeSideMenue() {
    let innwidth = $(".navtab").innerWidth()
    $(".side-menu").animate({ left: -innwidth }, 1000);
    $(".open-close-icon").removeClass("fa-x");
    $(".open-close-icon").addClass("fa-align-justify");

    for (let i = 0; i < 5; i++) {
        $(".lists li").eq(i).animate({ top: 400 }, 500);


    }

}


async function fetchByDefoult() {



    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let Fresponse = await response.json();
    console.log(Fresponse);
    displayFood(Fresponse.meals);







}




function displayFood(foods) {
    let container = ``;

    for (let i = 0; i < foods.length; i++) {

        container += `<div class="col-md-3">
        <div onclick=" getFoodDetails('${foods[i].idMeal}')" class="mealitem position-relative rounded-3 cursor-pointer overflow-hidden">
          <img class="w-100" src="${foods[i].strMealThumb}" alt="">
          <div class="whitelayer position-absolute d-flex align-items-center justify-content-center text-black p-2">
            <h3>${foods[i].strMeal}</h3>
          </div>
        </div>
      </div>`;




    }






    $("#insertrowData").html(container);






}


async function getFoodDetails(ID) {



    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    respone = await respone.json();

    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeOut(100, function () {
            $("body").css({ overflow: "auto" })

        })
    });

    displayFoodDetails(respone.meals[0])



}


function displayFoodDetails(arr) {


    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (arr[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
        }
    }

    let tags = arr.strTags;
    if (!tags) {
        tags = []

    } else {
        tags.split(",");

    }



    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }




    let container = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${arr.strMealThumb}"
                    alt="">
                    <h2>${arr.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${arr.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${arr.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${arr.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

    $("#insertrowData").html(container);

    $("#insertrowData2").html(container);
}


async function searchbyName(name) {
    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let Fresponse = await response.json();

    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeOut(100, function () {
            $("body").css({ overflow: "auto" })

        })
    });

    Fresponse.meals ? displaysearch(Fresponse.meals) : displaysearch([]);


}

async function searchbyLetter(letter) {
    if (letter == "") {
        letter = "m";

    }
    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let Fresponse = await response.json();
    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeOut(100, function () {
            $("body").css({ overflow: "auto" })

        })
    });
    Fresponse.meals ? displaysearch(Fresponse.meals) : displaysearch([]);

}


function displaysearch(foods) {
    let container = ``;

    for (let i = 0; i < foods.length; i++) {

        container += `<div class="col-md-3">
        <div onclick=" getFoodDetails('${foods[i].idMeal}')" class="mealitem position-relative rounded-3 cursor-pointer overflow-hidden">
          <img class="w-100" src="${foods[i].strMealThumb}" alt="">
          <div class="whitelayer position-absolute d-flex align-items-center justify-content-center text-black p-2">
            <h3>${foods[i].strMeal}</h3>
          </div>
        </div>
      </div>`;




    }






    $("#insertrowData2").html(container);




}


async function getCategoryyy() {
    $("#insertrowData").html("");
    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json();
    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeOut(100, function () {
            $("body").css({ overflow: "auto" });

        })
    });

    displayCategoryyy(response.categories)

}

function displayCategoryyy(c) {
    let cartoona = "";

    for (let i = 0; i < c.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getmyCategoryMeals('${c[i].strCategory}')" class="mealitem position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${c[i].strCategoryThumb}" alt="" srcset="">
                    <div class="whitelayer position-absolute text-center text-black p-2">
                        <h3>${c[i].strCategory}</h3>
                        <p>${c[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    $("#insertrowData").html(cartoona);
};


async function getmyCategoryMeals(code) {
    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });

    $("#insertrowData").html("");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${code}`)
    response = await response.json();
    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeOut(100, function () {
            $("body").css({ overflow: "auto" })

        })
    });


    displayFood(response.meals.slice(0, 20))//display frist 20 meals from fetched list


};



async function fetchArea() {
    $("#insertrowData").html("");


    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeOut(100, function () {
            $("body").css({ overflow: "auto" })

        })
    });

    displaymyArea(respone.meals)


};



function displaymyArea(a) {
    let container = "";

    for (let i = 0; i < a.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="areameals('${a[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${a[i].strArea}</h3>
                </div>
        </div>
        `
    }

    $("#insertrowData").html(container);
};

async function areameals(area) {
    $("#insertrowData").html("");


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayFood(response.meals.slice(0, 20))


};





async function fetchIngradients() {
    $("#insertrowData").html("");



    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeOut(100, function () {
            $("body").css({ overflow: "auto" })

        })
    });

    displayIngradients(respone.meals.slice(0, 20));


};




function displayIngradients(ing) {
    let container = "";

    for (let i = 0; i < ing.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="IngredientsMeals('${ing[i].strIngredient}')"text-center class="rounded-3  cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ing[i].strIngredient}</h3>
                        <p>${ing[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    $("#insertrowData").html(container);


}



async function IngredientsMeals(meallist) {
    $("#insertrowData").html("");

    $("#loading").fadeIn(function () {
        $(".lds-ripple").fadeIn(function () {
            $("body").css({ overflow: "hidden" })

        })
    });

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meallist}`)
    response = await response.json();
    $("#loading").fadeOut(100, function () {
        $(".lds-ripple").fadeIn(150, function () {
            $("body").css({ overflow: "auto" });

        })
    });


    displayFood(response.meals.slice(0, 20));


}

//  functions declerations  ends 












//valdition contact section starts







function validateName() {
    let regx = /^[a-zA-Z ]+$/.test(document.getElementById("input1").value);
    return regx
}


function validateEmail() {
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("input2").value)
    return regx
}


function validateNumber() {
    let regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("input3").value)
    return regx
}


function validateAge() {
    let regx = /^(1[89]|[1-9]\d)$/gm.test(document.getElementById("input4").value);
    return regx
}


function validatePass() {
    let regx = /^[A-Z][a-zA-Z]{2,50}[0-9]{1,50}$/.test(document.getElementById("input5").value);
    return regx
}


function revalidatePass() {
    if (document.getElementById("input6").value == document.getElementById("input5").value) {
        return true;
    }

}






















