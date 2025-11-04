import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';


const inputStyle = "w-full mt-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelStyle = "text-sm font-medium text-gray-700 dark:text-gray-300";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@ecommerce.com' 
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // TODO: Profil güncelleme API çağrısı
    console.log('Profil güncelleniyor:', profile);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Parola güncelleme API çağrısı
    console.log('Parola güncelleniyor...');
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profil Ayarları</h3>
      
      {/* Profil Bilgileri Formu */}
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelStyle}>Ad Soyad</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className={inputStyle} 
            />
          </div>
          <div>
            <label htmlFor="email" className={labelStyle}>Email Adresi</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className={inputStyle} 
            />
          </div>
        </div>
        <div className="text-right">
          <Button type="submit" variant="primary">
            Profili Güncelle
          </Button>
        </div>
      </form>

      {/* Ayırıcı */}
      <hr className="my-6 border-gray-200 dark:border-gray-700" />

      {/* Parola Değiştirme Formu */}
      <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Parola Değiştir</h4>
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <label htmlFor="current" className={labelStyle}>Mevcut Parola</label>
          <input 
            type="password" 
            id="current" 
            name="current"
            value={password.current}
            onChange={handlePasswordChange}
            className={inputStyle} 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="new" className={labelStyle}>Yeni Parola</label>
            <input 
              type="password" 
              id="new" 
              name="new"
              value={password.new}
              onChange={handlePasswordChange}
              className={inputStyle} 
            />
          </div>
          <div>
            <label htmlFor="confirm" className={labelStyle}>Yeni Parola (Tekrar)</label>
            <input 
              type="password" 
              id="confirm" 
              name="confirm"
              value={password.confirm}
              onChange={handlePasswordChange}
              className={inputStyle} 
            />
          </div>
        </div>
        <div className="text-right">
          <Button type="submit" variant="secondary">
            Parolayı Değiştir
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSettings;