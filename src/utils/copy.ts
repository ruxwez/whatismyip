async function Copy(texto: string) {
    try {
        await navigator.clipboard.writeText(texto);
        console.log('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar el texto al portapapeles', err);
    }
}

export default Copy