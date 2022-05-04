import { appConfig } from "@config";
const navigation = {
  social: [
    {
      name: "Linkedlin",
      href: appConfig.linkedlin,
      icon: () => (
        <svg
          height="20px"
          id="Capa_1"
          version="1.1"
          viewBox="0 0 97.75 97.75"
          width="20px"
          x="0px"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlSpace="preserve"
          y="0px"
        >
          <g>
            <path
              d="M48.875,0C21.882,0,0,21.882,0,48.875S21.882,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.868,0,48.875,0z
                M30.562,81.966h-13.74V37.758h13.74V81.966z M23.695,31.715c-4.404,0-7.969-3.57-7.969-7.968c0.001-4.394,3.565-7.964,7.969-7.964
              c4.392,0,7.962,3.57,7.962,7.964C31.657,28.146,28.086,31.715,23.695,31.715z M82.023,81.966H68.294V60.467
              c0-5.127-0.095-11.721-7.142-11.721c-7.146,0-8.245,5.584-8.245,11.35v21.869H39.179V37.758h13.178v6.041h0.185
              c1.835-3.476,6.315-7.14,13-7.14c13.913,0,16.481,9.156,16.481,21.059V81.966z"
            />
          </g>
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: appConfig.gitHub,
      icon: () => (
        <svg height="20px" viewBox="0 0 32 32" width="20px" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
        </svg>
      ),
    },
  ],
};

export const Footer = () => (
  <footer className="bg-white fixed bottom-0 left-0 right-0">
    <div className="max-w-12xl mx-auto p-2 overflow-hidden sm:px-6 lg:px-4">
      <div className="mt-2 flex justify-center space-x-3">
        {navigation.social.map((item) => (
          <a key={item.name} className="text-gray-400 hover:text-gray-500" href={item.href}>
            <span className="sr-only">{item.name}</span>
            <item.icon aria-hidden="true" />
          </a>
        ))}
      </div>
      <p className="mt-2 text-center text-base text-gray-400">&copy; 2020 Workflow, Inc. All rights reserved.</p>
    </div>
  </footer>
);
