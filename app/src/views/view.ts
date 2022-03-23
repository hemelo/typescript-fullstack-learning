export abstract class View<T>{
    protected element: HTMLElement
    private scape = false 

    constructor(selector: string, scape?: boolean){
        this.element = document.querySelector(selector)

        if(scape){
            this.scape = scape
        }
    }

    protected abstract template(model: T): string;

    update(model: T): void {
        let template = this.template(model)
        template = this.scape ? template : template.replace(/<script>[\s\S]*?<\/script>/, '')
        this.element.innerHTML = template
    }
}