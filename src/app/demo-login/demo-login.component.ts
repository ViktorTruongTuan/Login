import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { HttpClient,HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-demo-login',
  templateUrl: './demo-login.component.html',
  styleUrls: ['./demo-login.component.css']
})
export class DemoLoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService,private HttpClient:HttpClient) {
   }

url='https://www.linkedin.com/oauth/v2/authorization?client_id=86fblurqqwy2vh&scope=r_liteprofile&response_type=code&redirect_uri=http://localhost:4200/'

   signInWithLinkedin(){
     const httpHeader = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type':  'application/json'
     })

    this.HttpClient.get(this.url,{headers:httpHeader}).subscribe(data=>{
      console.log(data)
    })
   }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
