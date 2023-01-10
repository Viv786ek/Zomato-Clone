let isOrderAccepted = false;
let isValetFound = false;
let hasRastaurantSeenOrderAccepted = false;
let restaurantTimer = null;
let valetTimer = null;
let valetDeliveryTimer = null;
let isOrderDelivered = false;

//Zomato App - Boot up/ Power up/ Start
window.addEventListener('load', function (){
    document.getElementById('acceptOrder').addEventListener('click', function () {
        askRestaurantToAcceptOrReject();
    });

    document.getElementById('findValet').addEventListener('click', function(){
        setTimeout(() => {
            startSearchingForValets();
        },2000); 
    });

    this.document.getElementById('deliverOrder').addEventListener('click', function () {
        setTimeout(() => {
            isOrderDelivered = true;
        },2000);
    })

    checkIfOrderAcceptedFromRestaurant()
            .then(isOrderAccepted => {
                console.log('update from restaurant - ', isOrderAccepted);
                //Start preparing
                if (isOrderAccepted) startPreparingOrder();
                //Step 3 - Order rejected
                else this.alert('Sorry restaurant couldnt accept your order! Returning your amount with zomato shares')
            })
            .catch(err => {
                console.error(err);
                this.alert('Something went wrong! Please try again later')
        })
})



// Step 1 Check whether restaurant order or not
function askRestaurantToAcceptOrReject() {
    //Callback
    setTimeout(() => {
        isOrderAccepted = confirm('Should restaurant accept order?');
        hasRastaurantSeenOrderAccepted = true;
    }, 1000);// 1 sec
}



//Step 2 Check if Restaurant has accepted order
function checkIfOrderAcceptedFromRestaurant() {
    //Promise - Resolve(Accept) / Reject
    return new Promise((resolve, reject) => {
        restaurantTimer = setInterval(() => {
            console.log('checking if order accepted or not');
            if (!hasRastaurantSeenOrderAccepted) return;
        if (isOrderAccepted) resolve(true);
            else resolve(false);
            
            clearInterval(restaurantTimer);
    },2000);//2 sec
    });
}



// Step 4 - start preparing
function startPreparingOrder(){
    Promise.allSettled([
        updateOrderStatus(),
        updateMapView(),
        checkIfValetAssgined(),
        checkIfOrderDelivered()
    ])
    .then(res => {
        console.log(res);
        setTimeout(() => {
            alert('How was you food? Rate your food and delivery partner');
        }, 5000);
    })
        .catch(err => {
        console.error(err);
    })
}

// Helper functions - Pure function

// Update Order Status
function updateOrderStatus() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.getElementById('currentStatus').innerText = isOrderDelivered ? 'Order Delivered Successfully' : 'Preparing your order';
            resolve('status updated');
        },1500);
    })
}

// Update Map View
function updateMapView() {
    // Fake delay to get data
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.getElementById('mapview').style.opacity = '1';
            resolve('map initialised');
        }, 1000);
    })
}

// Start Searching For Valets
function startSearchingForValets() {
    // Complex Operation
    /**
     * 1. Get all locaitons of nearby valets
     * 2. sort the valets based on shortest path of restaurant to customer's home
     * 3. Select the valet with shortest distance and minimum orders
     */
    
    // Step 1. get valets
    const valetsPromises = [];
    for (let i = 0; i < 5; i++){
        valetsPromises.push(getRandomDriver());
    }
    console.log(valetsPromises);

    Promise.any(valetsPromises)
        .then(selectsValets => {
            console.log('Selected a valet =>', selectsValets);
            isValetFound = true;
        })
        .catch(err => {
        console.error(err);
    })
}

// Get random driver
function getRandomDriver() {
    // Fake delay to get location data from riders
    return new Promise((resolve, reject) => {
        const timeOut = Math.random()*1000;
        setTimeout(() => {
            resolve('Valets - ' + timeOut);
        }, timeOut);
    })
}

function checkIfValetAssgined() {
    return new Promise((resolve, reject) => {
        valetTimer = setInterval(() => {
            console.log('Searching for valet');
            if (isValetFound) {
                updateValetDetails();
                resolve('updated Valet details');
                clearTimeout(valetTimer);
            }
        },1000);
    })
}

function checkIfOrderDelivered() {
    return new Promise((resolve, reject) => {
        valetDeliveryTimer = setInterval(() => {
            console.log('is order delivered by valet');
            if (isOrderDelivered) {
                resolve('order delivered valet details');
                updateOrderStatus();
                clearTimeout(valetDeliveryTimer);
            }
        },1000);
    })
}

function updateValetDetails() {
    if (isValetFound) {
        document.getElementById('finding-driver').classList.add('none');
        document.getElementById('found-driver').classList.remove('none');
        document.getElementById('call').classList.remove('none');
    }
}


