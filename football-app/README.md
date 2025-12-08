# Futbol Skorları & Takım Bilgisi Uygulaması

Bu proje React kullanılarak geliştirilmiş, TheSportsDB API üzerinden veri çeken bir web uygulamasıdır.

## Özellikler
- Takım Arama
- Takım Detaylarını Görüntüleme (Logo, Açıklama, Kuruluş Yılı)
- Son 5 Maçın Skorlarını Listeleme
- Maç Sonucuna Göre Renklendirme (Galibiyet: Yeşil, Mağlubiyet: Kırmızı, Beraberlik: Gri)
- Responsive Tasarım (Karanlık Mod)

## Kurulum ve Çalıştırma

Bu projeyi çalıştırmak için bilgisayarınızda **Node.js** yüklü olmalıdır.

1. Proje klasörüne gidin:
   ```bash
   cd football-app
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

## Kullanılan Teknolojiler
- React
- Vite
- Axios
- CSS3 (Variables, Flexbox, Grid)
- TheSportsDB API

## API Hakkında
Kullanılan API: `https://www.thesportsdb.com/api/v1/json/3/`
- `/searchteams.php?t={TeamQuery}`
- `/eventslast.php?id={TeamID}`

## Ekran Görüntüsü
*(Ekran görüntüsünü buraya ekleyiniz)*
