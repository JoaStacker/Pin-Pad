const keysContainer = document.querySelector("body")

const pinPad = {
    elements: {
        main: null,
        inputArea: null,
        keysContainer: null,
        keys: ["1","2","3","4","5","6","7","8","9","backspace","0","done"]
    },

    events: {
        tried: false
    },

    properties: {
        value: "",
        max: 4
    },

    init(){
        //Create elements
        this.elements.main = document.createElement("div")
        this.elements.inputArea = document.createElement("input")
        this.elements.keysContainer = document.createElement("div")
        
        //Add classes
        this.elements.main.classList.add("pinpad")
        this.elements.main.setAttribute("id","loco")
        this.elements.inputArea.classList.add("pinpad-pass")
        this.elements.inputArea.setAttribute("type","password")
        this.elements.inputArea.setAttribute("readonly", "")
        console.log(this.elements.inputArea)
        this.elements.keysContainer.classList.add("numpad")

        //Insert elements
        this.elements.keysContainer.appendChild(this._createKeys())
        this.elements.main.appendChild(this.elements.inputArea)
        this.elements.main.appendChild(this.elements.keysContainer)
        document.body.appendChild(this.elements.main)
        
    },
    _createKeys(){
        const fragment = document.createDocumentFragment()
        this.elements.keys.forEach(item =>{
            const key = document.createElement("div")
            key.classList.add("numpad-key")
            console.log(item)
            switch(item){
                case "backspace": 
                    key.classList.add("material-icons")
                    key.innerHTML = item
                    key.addEventListener("click", () => {
                        
                        if(pinPad.events.tried === true){
                            pinPad.properties.value = ''
                        }
                        pinPad.properties.value = pinPad.properties.value.slice(0, pinPad.properties.value.length - 1)
                        document.querySelector("input").value = pinPad.properties.value
                        pinPad.events.tried = false
                        
                        
                    })
                    
                    break
                case "done": 
                    key.classList.add("material-icons")
                    key.innerHTML = item
                    key.addEventListener("click", () => {
                        this._check(pinPad.properties.value)
                        document.querySelector("input").value = pinPad.properties.value
                        pinPad.events.tried = true
                    });
                    break
                default:
                    key.innerHTML = item
                    key.addEventListener("click", ()=>{
                        if(pinPad.events.tried === true){
                            pinPad.properties.value = ''
                        }
                        if(pinPad.properties.value.length < pinPad.properties.max){
                            pinPad.properties.value += item
                            document.querySelector("input").value = pinPad.properties.value
                            pinPad.events.tried = false
                        }
                    })
                    break
            }
            fragment.appendChild(key)
        })
        return fragment
    },
    _check(){
        if(document.querySelector("input").value !== "1234"){
            console.log("ERROR: ACCESS DENIED")
            document.querySelector("input").classList.add("pinpad-pass__error")
            setTimeout(()=>{document.querySelector("input").classList.remove("pinpad-pass__error")}, 1000)
        }else{
            console.log("SUCCESS: ACCESS GRANTED")
            document.querySelector("input").classList.add("pinpad-pass__success")
            setTimeout(()=>{document.querySelector("input").classList.remove("pinpad-pass__success")}, 1000)
            setInterval(this._loco, 50);
        }
    },
    _loco(){
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const x = Math.floor(Math.random() * 80 - 40)
        const y = Math.floor(Math.random() * 80 - 40)
        const top = Math.floor(Math.random() *  1200 - 600)
        const left = Math.floor(Math.random() * 1200 - 600)
        const bottom = Math.floor(Math.random() *  1200 - 600)
        const right = Math.floor(Math.random() *  1200 - 600)
        console.log(r,g,b)
        console.log(x,y)
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`
        document.getElementById("loco").style.transform = `translate(${x}px,${y}px)`;
        const message = document.createElement("div")
        message.innerText = "ACCESS GRANTED!!!!"
        message.classList.add("sucess-title")
        message.style.color = `rgb(${b},${r},${g})`
        message.style.margin = `${top}px ${right}px ${bottom}px ${left}px`
        document.body.appendChild(message)
        
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
    pinPad.init()
})