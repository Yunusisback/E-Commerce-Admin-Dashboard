import { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext'; 




const inputStyle = "w-full mt-1 px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500";
const labelStyle = "text-sm font-medium text-gray-700 dark:text-gray-300";

const ProfileSettings = () => {
  const { user, setUser } = useApp();
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
  });
  const [profileStatus, setProfileStatus] = useState('idle');
  const [passwordStatus, setPasswordStatus] = useState('idle');
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileChange = (e) => {
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
    console.log('Profil güncelleniyor:', profile);
    
    setTimeout(() => {
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
        
        <div className="text-right flex items-center justify-end gap-4">
          {profileStatus === 'success' && (
            <span className="text-sm text-green-500">Profil Kaydedildi!</span>
          )}
     
          <Button 
            type="submit" 
            variant="primary" 
            className="dark:bg-amber-600 dark:hover:bg-amber-700"
            disabled={profileStatus === 'loading'}
          >
            {profileStatus === 'loading' ? 'Kaydediliyor...' : 'Profili Güncelle'}
          </Button>
        </div>
      </form>

      <hr className="my-6 border-gray-200 dark:border-zinc-700" />

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
         
          <Button 
            type="submit" 
            variant="secondary" 
            className="dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-gray-300"
            disabled={passwordStatus === 'loading'}
          >
            {passwordStatus === 'loading' ? 'Değiştiriliyor...' : 'Parolayı Değiştir'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSettings;