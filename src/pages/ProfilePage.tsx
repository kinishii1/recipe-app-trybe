import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../components/Profile';

function ProfilePage() {
  return (
    <>
      <Header title="Profile" withSearchIcons={ false } />
      <div>Profile</div>
      <Profile />
      <Footer />
    </>
  );
}

export default ProfilePage;
