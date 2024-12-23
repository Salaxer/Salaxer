function detectarYEnlazar(texto) {
    // 1. Detectar enlaces http/https
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    texto = texto.replace(urlRegex, (match) => {
      return `<a class="" href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
    
    // 2. Detectar correos (básico)
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    texto = texto.replace(emailRegex, (match) => {
      return `<a href="mailto:${match}">${match}</a>`;
    });
    
    // 3. Detectar teléfonos (básico: internacional o local con/ sin separadores)
    //    Ejemplo muy simplificado: grupos de 7+ dígitos, con prefijos opcionales.
    //    Ajusta el RegEx a tu estándar de país/uso real.
    const phoneRegex = /(\+?\d[\d\s-]{6,}\d)/g;
    texto = texto.replace(phoneRegex, (match) => {
      // Quitamos espacios o guiones para el "tel:" si se desea (opcional)
      const phoneForHref = match.replace(/[\s-]/g, '');
      return `<a href="tel:${phoneForHref}">${match}</a>`;
    });
    
    // 4. (Opcional) Detectar solo números (si necesitas enlazar algo más)
    //    Por ejemplo, si son puros dígitos:
    // const numberRegex = /\b\d+\b/g;
    // texto = texto.replace(numberRegex, (match) => {
    //   // Aquí decides qué hacer con un número simple. 
    //   // Por ejemplo, enlazar a un buscador interno, etc.
    //   return `<a href="/buscar?numero=${match}">${match}</a>`;
    // });
  
    return texto;
  }

  export default detectarYEnlazar;