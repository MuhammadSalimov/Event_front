

const Footer = () => {
  return (
    <footer className="bg-hero dark">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="heading_span-2 text-3xl font-bold">
           Event Arena
          </div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Facebook</span>

               
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Instagram</span>

           
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Twitter</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">GitHub</span>

               
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Dribbble</span>

                
              </a>
            </li>
          </ul>
        </div>

        <div
          className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 dark:border-gray-800"
        >
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Services</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  1on1 Coaching
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Company Review
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Accounts Review
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  HR Consulting
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  SEO Optimisation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Company</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Meet the Team
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Accounts Review
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  FAQs
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Live Chat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Legal</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Accessibility
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Returns Policy
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Refund Policy
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                  Hiring Statistics
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; 2024. Event Arena. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer