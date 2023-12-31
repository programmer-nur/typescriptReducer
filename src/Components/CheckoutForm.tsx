import { useReducer, useState } from "react";
import { AppAction, IInitialState } from "../interfaces";
import Modal from "./Modal";

const CheckoutFrom = () => {
  const [open, setOpen] = useState<boolean>(false);
  const initialState: IInitialState = {
    first_name: "Mr. / Mrs.",
    last_name: "",
    email: "enter your email",
    password: "",
    count: 0,
    terms: false,
  };

  const reducer = (state: IInitialState, action: AppAction): IInitialState => {
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          [action.payload!.name]: action.payload!.value,
        };
      case "TOGGLE":
        return {
          ...state,
          terms: !state.terms,
        };
      case "INCREMENT":
        return {
          ...state,
          count: state.count + action.payload,
        };
      case "DECREMENT":
        if (state.count < 1) {
          return{
           ...state,
           count:0,
          };
         }
        return {
          ...state,
          count: state.count - action.payload,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(!open)
    console.log(state);
  };
  return (
    <section className="bg-white">
      <div className="lg:grid">
        <Modal open={open} onClose={() => setOpen(!open)}>
          <div className="text-black h-full flex flex-col items-center justify-center text-center space-y-2">
            <h2 className="text-2xl font-semibold text-orange-400">
              Welcome {`${state.first_name} ${state.last_name}`}
            </h2>
            <p>Email: {state.email}</p>
            <p>No of Products: {state.count}</p>
            <p className="text-xl font-bold pt-4 text-blue-400">Order Created Successfully</p>
          </div>
        </Modal>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-blue-500 font-bold text-3xl text-center">
              CHECKOUT
            </h1>
            <form
              onSubmit={handelSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  onChange={(e) =>
                    dispatch({
                      type: "INPUT",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  onChange={(e) =>
                    dispatch({
                      type: "INPUT",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="text"
                  id="Email"
                  name="email"
                  onChange={(e) =>
                    dispatch({
                      type: "INPUT",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  onChange={(e) =>
                    dispatch({
                      type: "INPUT",
                      payload: { name: e.target.name, value: e.target.value },
                    })
                  }
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex pt-5 text-2xl gap-8 justify-center items-center col-span-6 sm:col-span-3">
                <label
                  htmlFor="No of PC's"
                  className="block text-sm font-medium text-gray-700"
                >
                  No of PC's
                </label>
                <span className="cursor-pointer"
                  onClick={() => dispatch({ type: "DECREMENT", payload: 1 })}
                >
                  <span>-</span>
                </span>
                <p>{state.count}</p>
                <span className=" cursor-pointer"
                  onClick={() => dispatch({ type: "INCREMENT", payload: 1 })}
                >
                  +
                </span>
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    onChange={() => dispatch({ type: "TOGGLE" })}
                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                 
                  className="inline-block shrink-0 rounded-md border  bg-blue-600 px-12 py-3 text-sm font-medium disabled:bg-slate-400 text-white"
                  disabled={!state.terms}
                >
                  CheckOut
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};
export default CheckoutFrom;
