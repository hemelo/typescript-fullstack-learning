export function checkPerformance() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const func = descriptor.value
        descriptor.value = function(...args: Array<any>) {
            const t1 = performance.now()
            const retorno = func.apply(this, args)
            const t2 = performance.now()
            console.log(`Método ${propertyKey}, tempo de execução: ${(t2 - t1) / 1000} segundos`)
            retorno
        }
    }
}