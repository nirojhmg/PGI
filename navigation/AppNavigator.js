import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from '../components/Login';
import Splash from '../components/Splash';
import Registration from '../components/Registration';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';
import TeacherProfile from '../components/TeacherProfile';
import StudentNotice from '../components/StudentNotice';
import TeacherSubject from '../components/TeacherSubject';
import TeacherNotice from '../components/TeacherNotice';
import TeacherAttendance from '../components/TeacherAttendance';
import StudentAttendance from '../components/StudentAttendance';
import TeacherAnalytics from '../components/TeacherAnalytics';
import StudentAnalytics from '../components/StudentAnalytics';
import StudentProfile from '../components/StudentProfile';
import StudentMainTabNavigator from './StudentMainTabNavigator';
import TeacherMainTabNavigator from './TeacherMainTabNavigator';
import StudentVote from '../components/StudentVote';
import TeacherVote from '../components/TeacherVote';
import TeacherAttendanceView from '../components/TeacherAttendanceView';
import FacultyNoticeView from '../components/FacultyNoticeView';
import FacultyAnalysisView from '../components/FacultyAnalysisView';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: Splash,
  Login: {
        screen: Login
    },
    Registration:{
        screen:Registration
    },

    StudentDashboard:{
        screen:StudentDashboard
    },
    TeacherMainTabNavigator:{
        screen:TeacherMainTabNavigator
    },
   StudentMainTabNavigator:{
        screen:StudentMainTabNavigator
    },
     TeacherDashboard:{
        screen:TeacherDashboard
    },
     TeacherNotice:{
        screen:TeacherNotice
    },
    TeacherAttendance:{
        screen:TeacherAttendance
    },
    StudentProfile:{
        screen:StudentProfile
    },
    StudentNotice:{
        screen:StudentNotice
    },
    TeacherProfile:{
        screen:TeacherProfile
    },
    TeacherSubject:{
        screen:TeacherSubject
    },
    StudentAnalytics:{
        screen:StudentAnalytics
    },
    TeacherAnalytics:{
        screen:TeacherAnalytics
    },
    StudentAttendance:{
        screen:StudentAttendance
    },
    FacultyNoticeView:{
        screen:FacultyNoticeView
    },
    TeacherVote:{
    screen:TeacherVote
    },
    TeacherAttendanceView:{
    screen:TeacherAttendanceView
    },
    FacultyAnalysisView:{
    screen:FacultyAnalysisView
    },
    StudentVote:{
    screen:StudentVote
    }

}));