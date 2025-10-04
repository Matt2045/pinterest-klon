import {type RouteConfig, route, layout} from "@react-router/dev/routes";

export default [
    layout("./routes/auth/auth-layout.tsx", [
        route("/", "./routes/root/sign-in.tsx"),
        //route("sign-up", "./routes/root/sign-up.tsx"),
    ]),
    // Feed-Bereich sauber unter /dashboard aufhängen,
    // damit der clientLoader NICHT an "/" hängt.
    layout("./routes/public/public-layout.tsx", [
        route("feed", "./routes/public/feed.tsx"),
        route("search", "./routes/public/search.tsx"),
        route("share-pin", "./routes/public/share-pin.tsx"),
        route("userprofile", "./routes/public/user-profile.tsx"),
        route("pin/:id", "./routes/public/pin-detail.tsx"),
    ]),
] satisfies RouteConfig;