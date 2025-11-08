import { useState, useEffect } from 'react'; 
import Card from '../common/Card';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext'; 



const inputStyle = "w-full mt-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelStyle = "text-sm font-medium text-gray-700 dark:text-gray-300";

const ProfileSettings = () => {
  // 2. ADIM: Global 'user' ve 'setUser' state'ini al
  const { user, setUser } = useApp();

  // 3. ADIM: Lokal form state'i, global 'user' statei ile başlat
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
  });
  // 4. ADIM: Profil ve parola işlemleri için durum state'leri
  const [profileStatus, setProfileStatus] = useState('idle');
  const [passwordStatus, setPasswordStatus] = useState('idle');

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileChange = (e) => {

    // Sadece lokal formu güncelle
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileStatus('idle');
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    setPasswordStatus('idle');
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfileStatus('loading');
    console.log('Global profil güncelleniyor:', profile);
    
    // API çağrısını simüle et
    setTimeout(() => {

      // 4. ADIM: Başarılı olunca, 'setUser' ile GLOBAL state'i güncelle
      setUser(profile);
      setProfileStatus('success');
    }, 1000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordStatus('loading');
    console.log('Parola güncelleniyor...');

    setTimeout(() => {
      setPasswordStatus('success');
      setPassword({ current: '', new: '', confirm: '' });
    }, 1000);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profil Ayarları</h3>
      
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelStyle}>Ad Soyad</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={profile.name} // Lokal 'profile' state'inden okur
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
              value={profile.email} // Lokal 'profile' state inden okur
              onChange={handleProfileChange}
              className={inputStyle} 
            />
          </div>
        </div>
        
        <div className="text-right flex items-center justify-end gap-4">
          {profileStatus === 'success' && (
            <span className="text-sm text-green-500">Profil Kaydedildi!</span>
          )}
          <Button type="submit" variant="primary" disabled={profileStatus === 'loading'}>
            {profileStatus === 'loading' ? 'Kaydediliyor...' : 'Profili Güncelle'}
          </Button>
        </div>
      </form>

      {/* (Parola formu)  */}
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
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
        <div className="text-right flex items-center justify-end gap-4">
          {passwordStatus === 'success' && (
            <span className="text-sm text-green-500">Parola Değiştirildi!</span>
          )}
          <Button type="submit" variant="secondary" disabled={passwordStatus === 'loading'}>
            {passwordStatus === 'loading' ? 'Değiştiriliyor...' : 'Parolayı Değiştir'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSettings;