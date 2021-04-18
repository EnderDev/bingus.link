// Copyright (C) 2021 Trevor Thalacker

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

window.shortenURL = () => {
    const formDetails = {
        longURL: document.getElementById("bl-lu").value
    }
    var formBody = [];
    for (var property in formDetails) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(formDetails[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("/api/url/shorten", { 
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(async res => {
        if(res.status == 200) {
            const data = await res.json();
            document.getElementById("bl-btn").onclick = () => window.resetPage();
            document.getElementById("bl-btn").innerHTML = "Shorten Another URL"
            document.getElementById("bl-t").innerHTML = "URL Shortened!"
            document.getElementById("bl-d").innerHTML = `${data.url}`
            document.getElementById('bl-f').style.display = 'none'
        } else {
            document.getElementById("bl-btn").onclick = () => window.resetPage();
            document.getElementById("bl-btn").innerHTML = "Try Again"
            document.getElementById("bl-t").innerHTML = "Something went wrong"
            document.getElementById("bl-d").innerHTML = `Please try again later`
            document.getElementById('bl-f').style.display = 'none'
        }
    }).catch(res => {
        document.getElementById("bl-btn").onclick = () => window.resetPage();
        document.getElementById("bl-btn").innerHTML = "Try Again"
        document.getElementById("bl-t").innerHTML = "Something went wrong"
        document.getElementById("bl-d").innerHTML = `Please try again later`
        document.getElementById('bl-f').style.display = 'none'
    })
}

window.resetPage = () => {
    window.location.reload()
}