class Template{
    constructor(obj){
        this.id = obj.id;
        this.data = obj.data;
    }
    
    init(){
        var id = this.id;
        this.insert(this.getContainer(id), this.create(this.data));
    }

    getContainer(id){
        return document.querySelector(id);
    }

    create(data){
        return `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="http://192.168.1.113:8080/yong/${data.image_Path}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title" style="margin-bottom: 0;">${data.image_Name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${data.image_Target_Link}</li>
            </ul>
        </div>`
    }

    insert(dom, data){
        dom.innerHTML += data;
    }
}

export default Template;