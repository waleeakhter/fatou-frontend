import { createWebHistory, createRouter } from "vue-router";

import store from "../store/index";

// layouts
const HomeLayout = () => import("../pages/layout/HomeLayout.vue");
const AboutLayout = () => import("../pages/layout/AboutLayout.vue");
const ContactLayout = () => import("../pages/layout/ContactLayout.vue");
const AuthLayout = () => import("../pages/layout/AuthLayout.vue");
const UserDashboardLayout = () =>
  import("../pages/layout/UserDashboardLayout.vue");
const AuthenticatedLayout = () =>
  import("../pages/layout/AuthenticatedLayout.vue");

// pages
const Database = () => import("../pages/Database.vue");
const HomePage = () => import("../pages/HomePage.vue");
const AboutPage = () => import("../pages/About.vue");
const ContactPage = () => import("../pages/ContactUs.vue");
const Chats = () => import("../pages/Chats.vue");
const VcsFounding = () => import("../pages/VcsFounding.vue");
// const SingleVcsFounding = () => import('../pages/SingleVcDetails.vue');

// founder
const BlackFounder = () => import("../pages/BlackFounder.vue");
const AddFoundersInfo = () => import("../pages/AddFoundersInfo.vue");

// buzz
const Feeds = () => import("../pages/Buzz.vue");
const SingleBuzzFeeds = () => import("../pages/SingleBuzzFeed.vue");

// dashboard pages
const UserDashboardInfo = () => import("../pages/dashboard/UserInfo.vue");
const UserDashboardLocation = () =>
  import("../pages/dashboard/UserLocation.vue");
const UserDashboardMentorship = () =>
  import("../pages/dashboard/UserMentorship.vue");
const UserDashboardExperience = () =>
  import("../pages/dashboard/WorkExperience.vue");
const UserDashboardWorkOption = () =>
  import("../pages/dashboard/WorkOptions.vue");
const UserDashboardContacts = () =>
  import("../pages/dashboard/UserContacts.vue");
const UserDashboardCompanyFounded = () =>
  import("../pages/dashboard/CompanyFounded.vue");

// founder
const UserDashboardPreferences = () =>
  import("../pages/dashboard/Preferences.vue");
const UserNotificationPreference = () =>
  import("../pages/dashboard/UserNotifications.vue");

// safety
const UserSafetyMenu = () => import("../pages/dashboard/Safety.vue");
const UserSafetyAccountOptions = () =>
  import("../pages/dashboard/safety/AccountOptions.vue");
const UserSafetyHideMode = () =>
  import("../pages/dashboard/safety/HideModeOption.vue");
const UserSafetyAdvanceOption = () =>
  import("../pages/dashboard/safety/AdvanceSecurity.vue");
const UserSafetyBlockedContacts = () =>
  import("../pages/dashboard/safety/BlockedContacts.vue");

// auth pages
const Signin = () => import("../pages/auth/Signin.vue");
const Signup = () => import("../pages/auth/Signup.vue");
const ForgotPassword = () => import("../pages/auth/ForgotPassword.vue");
const ForgotPasswordSuccess = () =>
  import("../pages/auth/ForgotPasswordSuccess.vue");
  const VerifyAccount = () => import("../pages/auth/VerifyAccount.vue");
const SetNewPassword = () => import("../pages/auth/SetNewPassword.vue");
const TwoFactorAuth = () => import("../pages/auth/TwoFactorAuth.vue");

// others
const NotFoundPage = import("../pages/NotFoundPage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeLayout,
    children: [
      {
        path: "",
        name: "home.about-us",
        component: HomePage,
        meta: {
          isAuth: false,
        },
      },
      

      
      {
        path: "/auth",
        name: "auth.page",
        component: AuthLayout,
        beforeEnter: () => {
          if (store.state.auth.isAuthenticated) return router.back();
        },
        meta: {
          isAuth: false,
        },
        children: [
          {
            path: "signin",
            name: "home.auth.signin",
            component: Signin,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "two-factor-authentication",
            name: "home.auth.twoFactorAuth",
            component: TwoFactorAuth,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "signup",
            name: "home.auth.signup",
            component: Signup,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "forgot/password",
            name: "home.auth.forgot.password",
            component: ForgotPassword,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "forgot/password/email-sent",
            name: "home.auth.forgot.password.completed",
            component: ForgotPasswordSuccess,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "signup/verify",
            name: "home.auth.verify.account",
            component: VerifyAccount,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "reset/password/:token",
            name: "home.auth.reset.password",
            component: SetNewPassword,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
        ],
      },
    ],
  },

  

  {
    path: "/about",
    name: "about",
    component: AboutLayout,
    children: [
      {
        path: "",
        name: "about.about-us",
        component: AboutPage,
        meta: {
          isAuth: false,
        },
      },
      

      
      {
        path: "/auth",
        name: "auth.page",
        component: AuthLayout,
        beforeEnter: () => {
          if (store.state.auth.isAuthenticated) return router.back();
        },
        meta: {
          isAuth: false,
        },
        children: [
          {
            path: "signin",
            name: "home.auth.signin",
            component: Signin,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "signup",
            name: "home.auth.signup",
            component: Signup,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "forgot/password",
            name: "home.auth.forgot.password",
            component: ForgotPassword,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "forgot/password/email-sent",
            name: "home.auth.forgot.password.completed",
            component: ForgotPasswordSuccess,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "signup/verify",
            name: "home.auth.verify.account",
            component: VerifyAccount,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "reset/password/:token",
            name: "home.auth.reset.password",
            component: SetNewPassword,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
        ],
      },
    ],
  },

   {
    path: "/contact",
    name: "contact",
    component: ContactLayout,
    children: [
      {
        path: "",
        name: "contact.contact-us",
        component: ContactPage,
        meta: {
          isAuth: false,
        },
      },
      

      
      {
        path: "/auth",
        name: "auth.page",
        component: AuthLayout,
        beforeEnter: () => {
          if (store.state.auth.isAuthenticated) return router.back();
        },
        meta: {
          isAuth: false,
        },
        children: [
          {
            path: "signin",
            name: "home.auth.signin",
            component: Signin,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "signup",
            name: "home.auth.signup",
            component: Signup,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "two-factor-authentication",
            name: "home.auth.twoFactorAuth",
            component: TwoFactorAuth,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "forgot/password",
            name: "home.auth.forgot.password",
            component: ForgotPassword,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "forgot/password/email-sent",
            name: "home.auth.forgot.password.completed",
            component: ForgotPasswordSuccess,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "signup/verify",
            name: "home.auth.verify.account",
            component: VerifyAccount,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
          {
            path: "reset/password/:token",
            name: "home.auth.reset.password",
            component: SetNewPassword,
            beforeEnter: () => {
              if (store.state.auth.isAuthenticated) return router.back();
            },
            meta: {
              isAuth: false,
            },
          },
        ],
      },
    ],
  },

  {
    path: "/home",
    name: "home.index",
    component: AuthenticatedLayout,
    meta: {
      isAuth: true,
    },
    children: [
      {
        path: "",
        name: "home.database",
        component: Database,
        meta: {
          isAuth: true,
        },
      },
      {
        path: "chats",
        name: "home.chats",
        component: Chats,
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/feeds",
        name: "home.feeds",
        component: Feeds,
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/feeds/:buzzId",
        name: "home.feeds.single",
        component: SingleBuzzFeeds,
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/founders",
        name: "home.founders",
        component: BlackFounder,
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/founders/create",
        name: "home.founders.create",
        component: AddFoundersInfo,
        meta: {
          isAuth: true,
        },
      },
      {
        path: "/vcs-founding",
        name: "home.vcfounding",
        component: VcsFounding,
        meta: {
          isAuth: true,
        },
      },
      // {
      // 	path: '/vcs-founding/:vcId',
      // 	name: 'home.vcfounding.single',
      // 	component: SingleVcsFounding,
      // 	meta: {
      // 		isAuth: true,
      // 	},
      // },
      // layout
      {
        path: "/auth/user/dashboard",
        name: "user.dashboard.profile",
        redirect: "/auth/user/dashboard/profile",
        component: UserDashboardLayout,
        meta: {
          isAuth: true,
        },
        children: [
          {
            path: "profile",
            name: "user.dashboard.profile.index",
            component: UserDashboardInfo,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "location",
            name: "user.dashboard.profile.location",
            component: UserDashboardLocation,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "preferences",
            name: "user.dashboard.profile.settings",
            component: UserDashboardPreferences,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "notifications",
            name: "user.dashboard.profile.notifications",
            component: UserNotificationPreference,
            meta: {
              isAuth: true,
            },
          },
          // safety
          {
            path: "safety",
            name: "user.dashboard.profile.safety",
            component: UserSafetyMenu,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "safety/account/security",
            name: "user.dashboard.profile.safety.security",
            component: UserSafetyAdvanceOption,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "safety/account/options",
            name: "user.dashboard.profile.safety.options",
            component: UserSafetyAccountOptions,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "safety/hide-mode",
            name: "user.dashboard.profile.safety.hide-mode",
            component: UserSafetyHideMode,
            meta: {
              isAuth: true,
            },
          },
          // others
          {
            path: "contacts",
            name: "user.dashboard.contacts",
            component: UserDashboardContacts,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "company",
            name: "user.dashboard.founded",
            component: UserDashboardCompanyFounded,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "contacts/blocked",
            name: "user.dashboard.contacts.blocked",
            component: UserSafetyBlockedContacts,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "work-options",
            name: "user.dashboard.work.options",
            component: UserDashboardWorkOption,
            meta: {
              isAuth: true,
            },
          },
          {
            path: "experiences",
            name: "user.dashboard.work.experiences",
            component: UserDashboardExperience,
            meta: {
              isAuth: false,
            },
          },
          {
            path: "mentorship",
            name: "user.dashboard.mentorship",
            component: UserDashboardMentorship,
            meta: {
              isAuth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
    meta: {
      isAuth: false,
    },
  },
];

const history = createWebHistory();

// create router instance
const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { top: 0 };
      // return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from) => {
  if (to.meta.isAuth && !store.state.auth.isAuthenticated) {
    return {
      path: "/auth/signin",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
