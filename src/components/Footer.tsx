const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bohdan Medvedchuk. Wszelkie prawa zastrzeżone.
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        Zbudowane z <span className="text-rose">❤️</span> i React
      </p>
    </div>
  </footer>
);

export default Footer;
