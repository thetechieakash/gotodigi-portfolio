import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { logout } from '../../store/authSlice.js';
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandeler = () => {
    authService.logOut()
      .then(() => {
        dispatch(logout())
        navigate("/admin/login", { replace: true });
      })
      .catch((err) => {
        console.error('Logout error', err);
      })
  }
  return (
    <button onClick={logoutHandeler}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-red-500 hover:text-white"
    >
      <LogOut size={18} />
      Logout
    </button>
  )
}

export default LogoutBtn