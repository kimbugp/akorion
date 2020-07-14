
    const url = 'http://127.0.0.1:5000/items';

    function populateItems(items) {
        let tableElement = document.getElementById('item_table')
        items.forEach(element => {
            let sampleRow = createChildNodes(element)
            tableElement.appendChild(sampleRow)
        });

    }

    function getItems() {
        fetch(url, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                return response.json()
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
        event.preventDefault()
        const data = {
            name: event.currentTarget.name.value,
            price: event.currentTarget.price.value
        }
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            let tableElement = document.getElementById('item_table')
            let newRow = createChildNodes(data)
            tableElement.appendChild(newRow)
        });
    }
    getItems()