/*
 * Reducer actions related with navigation
 */
import NavigationService from 'app/navigation/NavigationService';

export function navigateToHome(params) {
  NavigationService.navigate('OTP', params);
}

export function navigateToBoarding(){
  NavigationService.navigate('Signup');

}

export function navigateToJobList(){
  NavigationService.navigate('JobListScreen');

}
