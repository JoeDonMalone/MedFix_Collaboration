const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};
  
//   const isWeekend = day => {
//     //return saturday and sunday
//     return day % 7 === 0 & day % 7 === 6;
// }

// const getDayName = day => {
//   const date = new Date(Date.UTC(2021, 3, day));
//   return new Intl.DateTimeFormat("en-US", {weekday: "short"}).format(date);
// }

  module.exports = withAuth
  // module.exports = isWeekend
  // module.exports = getDayName






  