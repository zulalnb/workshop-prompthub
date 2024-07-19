import "@styles/globals.css";
import Favicon from "../public/assets/images/logo.svg";
import Provider from "@components/Provider";
import Nav from "@components/Nav";

export const metadata = {
  title: "PromptHub",
  description: "Discover & Share AI Prompts",
  icons: [{ rel: "icon", url: Favicon.src }],
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      {/* putting everything inside of body is must */}
      <Provider>
        <body>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
