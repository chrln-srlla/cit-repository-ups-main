import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AdminProvider } from './contexts/AdminContext'
import { AuthProvider } from './contexts/AuthContext'
import { CapstoneProjectsProvider } from './contexts/CapstoneProjectsContext'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Home from './frontend/Landing Page/Home'
import Submit from './frontend/Landing Page/Submit'
import CapstoneSearch from './frontend/Landing Page/CapstoneSearch'
import AboutUs from './frontend/Landing Page/AboutUs'
import AdminLoginPage from './frontend/Admin/AdminLoginPage'
import AdminDashboard from './frontend/Admin/AdminDashboard'
import CapstoneProjects from './frontend/Admin/CapstoneProjects'
import ManuscriptUploads from './frontend/Admin/ManuscriptUploads'
import ManuscriptDetail from './frontend/Admin/ManuscriptDetail'
import PublishManuscript from './frontend/Admin/PublishManuscript'
import AdminAccountManagement from './frontend/Admin/AdminAccountManagement'
import AdminSettings from './frontend/Admin/AdminSettings'
import SignUp from './frontend/SignUp'
import LogIn from './frontend/LogIn'
import AuthTestPage from './frontend/AuthTestPage'


export default function App() {
	// Root Component
	return (
		<AuthProvider>
			<AdminProvider>
				<CapstoneProjectsProvider>
					<Router>
						<Routes>
							<Route path="/" element={<LogIn />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/test-auth" element={<AuthTestPage />} />

							<Route
								path="/submit"
								element={
									<AuthenticatedRoute>
										<Submit />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/home"
								element={
									<AuthenticatedRoute>
										<Home />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/capstone"
								element={
									<AuthenticatedRoute>
										<CapstoneSearch />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/about"
								element={
									<AuthenticatedRoute>
										<AboutUs />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/login"
								element={
									<AuthenticatedRoute>
										<AdminLoginPage />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/dashboard"
								element={
									<AuthenticatedRoute>
										<AdminDashboard />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/capstone-projects"
								element={
									<AuthenticatedRoute>
										<CapstoneProjects />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/manuscript-uploads"
								element={
									<AuthenticatedRoute>
										<ManuscriptUploads />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/manuscript-uploads/:id"
								element={
									<AuthenticatedRoute>
										<ManuscriptDetail />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/publish-manuscript"
								element={
									<AuthenticatedRoute>
										<PublishManuscript />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/account-management"
								element={
									<AuthenticatedRoute>
										<AdminAccountManagement />
									</AuthenticatedRoute>
								}
							/>
							<Route
								path="/admin/settings"
								element={
									<AuthenticatedRoute>
										<AdminSettings />
									</AuthenticatedRoute>
								}
							/>
						</Routes>
					</Router>
				</CapstoneProjectsProvider>
			</AdminProvider>
		</AuthProvider>
	)
}
