export default function ContactSection() {
  return (
    <section id="contact" className="p-8 max-w-3xl page-transition">
      <div className="border-t-2 border-gray-300 mx-8 mb-8"></div>
      
      <h1 className="text-4xl font-medium mb-6 animate-in inline">contact</h1>
      <span className="text-xl mx-6 text-gray-500">—</span>
      <div className="text-lg text-gray-700 animate-in-delay max-w-2xl leading-relaxed mt-4 mb-2">
        <p>
          open to collaborations, commissions, and interdisciplinary projects. i'm particularly drawn to audiovisual installations and experimental media.
        </p>
      </div>

      
      <div className="animate-in mt-8">
        <div className="bg-warm-beige p-6 rounded-lg">
          <div>
            <h3 className="text-lg font-medium mb-3 text-charcoal">get in touch</h3>
            <a 
              href="mailto:merkaifx@gmail.com" 
              className="text-lg text-charcoal hover:text-gray-600 transition-colors underline hover:no-underline block"
            >
              merkaifx@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}