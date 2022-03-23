export function inspect(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) 
{
    const func = descriptor.value
    descriptor.value = function(...args: Array<any>) {
        console.log(`-- Método ${this.constructor.name}::${propertyKey}(${JSON.stringify(args)}) --`)
        const retorno = func.apply(this, args)
        console.log(`Retorna: ${retorno}`)
        retorno
    }
}