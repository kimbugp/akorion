
function populateItems(items) {
    let tableElement = document.getElementById('item_table')
    debugger
    items.forEach(element => {
        let sampleRow = createChildNodes(element)
        tableElement.appendChild(sampleRow)
    });

}

function getItems() {
    const url = 'http://127.0.0.1:5000/items';

    axios.get(url, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })
        .then(response => {
            return response.text()
        })
        .then(data => {
            populateItems(data)
        }).catch(error => {
            console.log(error)
        })
}
function createChildNodes(item) {
    let row = document.createElement('tr')
    row.innerHTML = `<td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>`
    return row
}

function handleSubmit(event) {
    //todo
}
function handleShowForm(event) {
    //todo
}
getItems()