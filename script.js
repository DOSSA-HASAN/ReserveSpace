let personName = document.getElementById('personName')
let idNum = document.getElementById('idNum')
let telNum = document.getElementById('personTel')
let email = document.getElementById('personEmail')
let numOfRooms = document.getElementById('rooms')
let duration = document.getElementById('duration')
let addBooking = document.getElementById('addBookin')
let tableRecords = document.getElementById('bookingRecords')
let currentDate = new Date()
let currentYear = currentDate.getFullYear().toString()
let currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
let currentDay = currentDate.getDate().toString().padStart(2, '0')
let roomNum = 0;

let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
console.log(bookings)

if(!Array.isArray(bookings)){
    bookings = []

}

bookings.forEach(booking => {

    let row = document.createElement('tr')

    let nameCol = document.createElement('td')
    nameCol.innerHTML = booking.name

    let idCol = document.createElement('td')
    idCol.innerHTML = booking.id

    let telCol = document.createElement('td')
    telCol.innerHTML = booking.tel

    let emailCol = document.createElement('td')
    emailCol.innerHTML = booking.email

    let roomsCol = document.createElement('td')
    roomsCol.innerHTML = booking.numberOfRooms

    let durationCol = document.createElement('td')
    durationCol.innerHTML = `from ${currentYear}-${currentMonth}-${currentDay} to ${booking.duration}`

    let roomCol = document.createElement('td')
    roomCol.innerHTML = roomNum + 1 

    let extendStayCol = document.createElement('td')
    let extendStayInput = document.createElement('input')
    extendStayInput.setAttribute('type', 'date')
    let addNewDurationButton = document.createElement('button')
    addNewDurationButton.innerText = "Stay Longer"
    extendStayCol.append(extendStayInput)
    extendStayCol.append(addNewDurationButton)

    let checkoutCol = document.createElement('td')
    let checkoutButton = document.createElement('button')
    checkoutButton.setAttribute('data-room-num', booking.numberOfRooms)
    checkoutButton.innerText = "Confirm Checkout"
    checkoutButton.addEventListener('click', (event) => {
        let roomNum = event.target.getAttribute('data-room-num')
        let parent = event.target.parentNode.parentNode
        parent.remove()
        removeFromLocalStorage(roomNum)
    });
    checkoutCol.append(checkoutButton)
    


    row.append(nameCol)
    row.append(idCol)
    row.append(telCol)
    row.append(emailCol)
    row.append(roomsCol)
    row.append(durationCol)
    row.append(roomCol)
    row.append(extendStayCol)
    row.append(checkoutCol)
    tableRecords.append(row)

});

addBooking.addEventListener('click', ()=>{
    let dateParts = duration.value.split('-')
        let years = dateParts[0]
        let months = dateParts[1]
        let days= dateParts[2]
        console.log(years)
        console.log(months)
        console.log(days)

    if(personName.value !== '' && idNum.value !== '' && idNum.value !== 0 &&telNum.value !== '' && email.value !== '' && numOfRooms.value !== 'none' && duration.value !== '' && duration.value !== 0 && (years >= currentYear && months >= currentMonth || days >= currentDay)){
        let booking = {
            name: personName.value,
            id: idNum.value,
            tel: telNum.value,
            email: email.value,
            numberOfRooms: numOfRooms.value,
            duration: duration.value
        }

        bookings.push(booking)
        localStorage.setItem("bookings", JSON.stringify(bookings))

        let row = document.createElement('tr')

        let nameCol = document.createElement('td')
        nameCol.innerHTML = booking.name

        let idCol = document.createElement('td')
        idCol.innerHTML = booking.id

        let telCol = document.createElement('td')
        telCol.innerHTML = booking.tel

        let emailCol = document.createElement('td')
        emailCol.innerHTML = booking.email

        let roomsCol = document.createElement('td')
        roomsCol.innerHTML = booking.numberOfRooms

        let durationCol = document.createElement('td')
        durationCol.innerHTML = `from ${currentYear}-${currentMonth}-${currentDay} to ${booking.duration}`

        let roomCol = document.createElement('td')
        roomCol.innerHTML = roomNum + 1 

        let extendStayCol = document.createElement('td')
        let extendStayInput = document.createElement('input')
        extendStayInput.setAttribute('type', 'date')
        let addNewDurationButton = document.createElement('button')
        addNewDurationButton.innerText = "Stay Longer"
        extendStayCol.append(extendStayInput)
        extendStayCol.append(addNewDurationButton)

        let checkoutCol = document.createElement('td')
        let checkoutButton = document.createElement('button')
        checkoutButton.setAttribute('data-room-num', booking.numberOfRooms)
        checkoutButton.innerText = "Confirm Checkout"
        checkoutCol.append(checkoutButton)
        checkoutButton.addEventListener('click', ()=>{
            let parent = checkoutButton.parentNode.parentNode;
            parent.remove()
        })


        row.append(nameCol)
        row.append(idCol)
        row.append(telCol)
        row.append(emailCol)
        row.append(roomsCol)
        row.append(durationCol)
        row.append(roomCol)
        row.append(extendStayCol)
        row.append(checkoutCol)
        tableRecords.append(row)

        addNewDurationButton.addEventListener('click', ()=>{
            let extendStay = extendStayInput.value
            console.log(extendStay)
            let NewDuration = extendStay.split('-')
            console.log(NewDuration[0])
            console.log(NewDuration[1])
            console.log(NewDuration[2])

            if(NewDuration[0] >= years && NewDuration[1] >= months && NewDuration[2] > days){
                durationCol.innerHTML = `from ${currentYear}-${currentMonth}-${currentDay} to ${extendStay}`
                alert("Duration has been extended")
            } else{alert("extend date cannot be less then previous date")}
        })

        checkoutButton.addEventListener('click', (event) => {
            let roomNum = event.target.getAttribute('data-room-num')
            let parent = event.target.parentNode.parentNode
            parent.remove()
            removeFromLocalStorage(roomNum)
        });
        


        console.log("all done")
    } else{alert("empty fields")}
    

    
})

function removeFromLocalStorage(roomNum){
    //getjson
    let bookings = JSON.parse(localStorage.getItem('bookings'))
    let index = bookings.findIndex(booking => booking.numberOfRooms === roomNum)
    if(index !== -1){
        bookings.splice(index, 1)
        localStorage.setItem('bookings', JSON.stringify(bookings))
    }
}


//uncomment the line below to empty the local storage
// localStorage.clear()






