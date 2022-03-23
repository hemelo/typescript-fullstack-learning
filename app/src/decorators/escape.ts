export function escape(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) 
{
    const func = descriptor.value
    descriptor.value = function(...args: Array<any>) {
        let retorno = func.apply(this, args)
        
        if(typeof retorno === 'string') 
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '')

        retorno
    }
}