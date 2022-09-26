'use strict';
(self.webpackChunklabel_front = self.webpackChunklabel_front || []).push([
  [811],
  {
    8811: function (e, s, n) {
      n.r(s),
        n.d(s, {
          default: function () {
            return P;
          },
        });
      var t = n(9439),
        r = 'User_main__LPwHA',
        l = 'User_divText__n9fTs',
        c = 'User_profile__SS9pn',
        a = 'User_profileImg__noDlI',
        i = 'User_profileInfo__W8Bs1',
        u = 'User_namep__Bmubl',
        o = 'User_grassP__y6P2e',
        h = 'User_divHistory__FKAQT',
        d = 'User_commitDate__uUpbN',
        f = 'User_commitLi__8rjJZ',
        _ = 'User_commitp__g-LCz',
        m = 'User_lineImg__4Wz-E',
        j = 'User_divTable__rSRpU',
        x = 'User_th__h4oZt',
        v = 'User_thead__Kbt5w',
        p = 'User_tdTitle__+qAOe',
        g = 'User_td__NZrC7',
        N = 'User_graph__FI+lk',
        U = 'User_squares__4pC+E',
        y = n(2791),
        b = n(9434),
        k = n(906),
        D = n(184);
      function P() {
        var e = (0, b.v9)(function (e) {
          return e.onOffHistory;
        });
        return (0, D.jsx)('main', {
          className: r,
          children: (0, D.jsxs)('article', {
            children: [
              (0, D.jsxs)('section', {
                children: [
                  (0, D.jsx)('div', {
                    className: l,
                    children: (0, D.jsx)('h2', { children: 'My Page' }),
                  }),
                  (0, D.jsx)('div', { className: c, children: (0, D.jsx)(I, {}) }),
                  (0, D.jsxs)('div', {
                    children: [(0, D.jsx)('p', { className: o, children: 'My Daily History' }), (0, D.jsx)(M, {})],
                  }),
                  e ? (0, D.jsx)('div', { className: h, children: (0, D.jsx)(A, {}) }) : null,
                ],
              }),
              (0, D.jsx)('img', { className: m, src: '/images/line.png' }),
              (0, D.jsxs)('section', {
                children: [
                  (0, D.jsx)('div', {
                    className: l,
                    children: (0, D.jsx)('h2', { children: 'My Library' }),
                  }),
                  (0, D.jsx)('div', {
                    className: j,
                    children: (0, D.jsxs)('table', {
                      children: [
                        (0, D.jsx)('thead', {
                          className: v,
                          children: (0, D.jsxs)('tr', {
                            children: [
                              (0, D.jsx)('th', { className: x, children: 'Title' }),
                              (0, D.jsx)('th', { className: x, children: 'Page' }),
                              (0, D.jsx)('th', { className: x, children: 'Date' }),
                            ],
                          }),
                        }),
                        (0, D.jsx)('tbody', { children: (0, D.jsx)(C, {}) }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      var I = function () {
          var e = (0, y.useState)([]),
            s = (0, t.Z)(e, 2),
            n = s[0],
            r = s[1];
          return (
            (0, y.useEffect)(function () {
              fetch('https://inkyuoh.shop/userInfo')
                .then(function (e) {
                  return e.json();
                })
                .then(function (e) {
                  r(e.result);
                })
                .catch(function (e) {
                  console.log(e);
                });
            }, []),
            (0, D.jsx)(w, { result: n, length: n.length })
          );
        },
        w = function (e) {
          var s, n, t;
          return (0, D.jsxs)(D.Fragment, {
            children: [
              (0, D.jsx)('img', {
                className: a,
                src: ''.concat(null === (s = e.result[0]) || void 0 === s ? void 0 : s.userPhoto),
              }),
              (0, D.jsxs)('div', {
                className: i,
                children: [
                  (0, D.jsx)('p', { children: 'My Profile' }),
                  (0, D.jsx)('p', {
                    className: u,
                    children: null === (n = e.result[0]) || void 0 === n ? void 0 : n.userName,
                  }),
                  (0, D.jsx)('p', {
                    children: null === (t = e.result[0]) || void 0 === t ? void 0 : t.userEmail,
                  }),
                ],
              }),
            ],
          });
        },
        A = function () {
          var e = (0, b.v9)(function (e) {
            return e.commitInfo;
          });
          return (function () {
            for (var s = Array(), n = 0; n < e.length; n++)
              s.push(
                (0, D.jsxs)('ul', {
                  children: [
                    (0, D.jsx)('li', { className: f, children: e[n].bookName }),
                    (0, D.jsx)('p', { className: _, children: e[n].commitMessage }),
                    (0, D.jsx)('p', { className: d, children: e[n].createdAt }),
                  ],
                }),
              );
            return s;
          })();
        },
        C = function () {
          var e = (0, y.useState)([]),
            s = (0, t.Z)(e, 2),
            n = s[0],
            r = s[1];
          return (
            (0, y.useEffect)(function () {
              fetch('https://inkyuoh.shop/users/'.concat(58, '/pdfs'))
                .then(function (e) {
                  return e.json();
                })
                .then(function (e) {
                  r(e.result);
                })
                .catch(function (e) {
                  console.log(e);
                });
            }, []),
            (0, D.jsx)(E, { result: n, length: n.length })
          );
        },
        E = function (e) {
          return (function () {
            for (var s = Array(), n = 0; n < e.result.length; n++)
              s.push(
                (0, D.jsxs)('tr', {
                  children: [
                    (0, D.jsx)('td', { className: p, children: e.result[n].pdfName }),
                    (0, D.jsxs)('td', {
                      className: g,
                      children: [e.result[n].recentlyReadPage, ' / ', e.result[n].totalPage],
                    }),
                    (0, D.jsx)('td', { className: g, children: e.result[n].updatedAt }),
                  ],
                }),
              );
            return s;
          })();
        };
      function M() {
        var e = (0, y.useState)([]),
          s = (0, t.Z)(e, 2),
          n = s[0],
          r = s[1];
        return (
          (0, y.useEffect)(function () {
            fetch('https://inkyuoh.shop/userInfo')
              .then(function (e) {
                return e.json();
              })
              .then(function (e) {
                r(e.result);
              });
          }, []),
          (0, D.jsx)('div', {
            className: N,
            children: (0, D.jsx)('ul', {
              className: U,
              children: (0, D.jsx)(S, { date: n, length: n.length }),
            }),
          })
        );
      }
      var S = function (e) {
        var s = (0, b.I0)();
        if (0 != e.date.length) {
          return (function () {
            for (
              var n = Array(),
                t = function (t) {
                  '0' !== e.date[0].commitGrass[t]
                    ? n.push(
                        (0, D.jsx)(
                          'li',
                          {
                            date: T(364 - t, new Date()),
                            'data-level': 1,
                            onClick: function () {
                              s((0, k.Jg)());
                              var e = T(364 - t, new Date());
                              fetch('https://inkyuoh.shop/commits/daily/date/'.concat(e))
                                .then(function (e) {
                                  return e.json();
                                })
                                .then(function (e) {
                                  s((0, k.Pm)(e.result));
                                });
                            },
                          },
                          t,
                        ),
                      )
                    : '0' == e.date[0].commitGrass[t] &&
                      n.push(
                        (0, D.jsx)(
                          'li',
                          {
                            date: T(364 - t, new Date()),
                            onClick: function () {
                              s((0, k.z7)());
                            },
                          },
                          t,
                        ),
                      );
                },
                r = 1;
              r < 365;
              r++
            )
              t(r);
            return n;
          })();
        }
      };
      function T(e) {
        var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date();
        s.setDate(s.getDate() - e);
        var n = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate();
        return n;
      }
    },
  },
]);
//# sourceMappingURL=811.6c319cae.chunk.js.map
