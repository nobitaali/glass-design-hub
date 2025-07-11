
'use client'

const GoogleMaps = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lokasi & Area Layanan
          </h2>
          <p className="text-lg text-muted-foreground">
            Melayani pemasangan di seluruh Indonesia dengan kualitas terjamin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Area Utama Layanan</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  "Jakarta Selatan", "Jakarta Utara", "Jakarta Barat", "Jakarta Timur",
                  "Jakarta Pusat", "Bogor", "Depok", "Tangerang",
                  "Bekasi", "Bandung", "Surabaya", "Medan"
                ].map((area, index) => (
                  <div key={index} className="bg-secondary/10 p-3 rounded-lg text-center">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">📍 Kantor Pusat</h4>
              <p className="text-muted-foreground mb-2">Jakarta Selatan, DKI Jakarta</p>
              <p className="text-sm text-muted-foreground">
                📞 WhatsApp: +62 851-5627-5565<br/>
                ✉️ Email: info@interiorfilm.com<br/>
                🕒 Buka: Senin - Minggu (24/7)
              </p>
            </div>
          </div>

          <div className="relative h-96 bg-secondary/20 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.45964309026!2d106.68942896496508!3d-6.229386865688655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1703000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Interior Solutions Indonesia"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoogleMaps
