import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type PrivateRouterProps = {
	roleP?: string;
	children: ReactNode
};

const PrivateRoute: React.FC<PrivateRouterProps> = ({roleP, children }) => {
	const { isAuthenticated, role} = useAuth();
	const router = useRouter();

	useEffect(() => {
		console.log(role, 'in private rpute')
		if ((!isAuthenticated) || (roleP && roleP !=role)) 
		{
			router.push('/Login'); // Redirect to login if not authenticated
		}
	}, [isAuthenticated]);

	if (!isAuthenticated) {
		return null; // Optionally, you can show a loading spinner here
	}

	return <>{children}</>;
};

export default PrivateRoute;
