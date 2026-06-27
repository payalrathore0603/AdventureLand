import { Link, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import Select, { type StylesConfig } from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InferType } from "yup";

import { fetchBaseApi } from "../../utility/api";
import { signupSchema } from "../../schema/signupSchema";
import Input from "../common/Input";

type UserInfoProps = InferType<typeof signupSchema>;

type SelectOption = {
  value: string;
  label: string;
};

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: 48,
    borderRadius: 8,
    borderColor: "#d1d5db",
    boxShadow: "none",
  }),
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<UserInfoProps>({
    resolver: yupResolver(signupSchema),
  });

  const navigate = useNavigate();

  const country = watch("address.country");
  const state = watch("address.state");
  const city = watch("address.city");

  const countries: SelectOption[] = Country.getAllCountries().map(
    (country) => ({
      value: country.isoCode,
      label: `${country.flag} ${country.name}`,
    }),
  );

  const states: SelectOption[] = State.getStatesOfCountry(country || "").map(
    (state) => ({
      value: state.isoCode,
      label: state.name,
    }),
  );

  const cities: SelectOption[] = City.getCitiesOfState(country, state).map(
    (city) => ({
      value: city.name,
      label: city.name,
    }),
  );

  const onSubmit = async (data: UserInfoProps) => {
    try {
      const response = await axios.post(`${fetchBaseApi}/api/auth/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: {
          street: data.address.street,
          pincode: data.address.pincode,
          country,
          state,
          city,
        },
        location: {
          type: "Point",
          coordinates: [77.5946, 12.9716],
        },
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface-bg)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-[var(--color-surface-panel)] rounded-2xl shadow-xl">
        {/* Header */}

        <div className="border-b px-8 py-6">
          <h1 className="text-3xl font-bold text-center text-[var(--color-text-primary)]">
            Get Started with AdventureLand
          </h1>

          <p className="text-center text-[var(--color-text-muted)] mt-2">
            Create your account to continue
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="p-6 md:p-10 space-y-10"
        >
          {/* Personal Information */}

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <Input
                placeholder="Name"
                register={register("name")}
                error={errors.name?.message}
              />

              <Input
                placeholder="Email"
                register={register("email")}
                error={errors.email?.message}
              />

              <Input
                type="password"
                placeholder="Password"
                register={register("password")}
                error={errors.password?.message}
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                register={register("conformPassword")}
                error={errors.conformPassword?.message}
              />

              <Input
                placeholder="Phone"
                register={register("phone")}
                error={errors.phone?.message}
              />
            </div>
          </div>

          {/* Address */}

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
              Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                placeholder="Street"
                register={register("address.street")}
                error={errors.address?.street?.message}
              />

              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={selectStyles}
                    options={countries}
                    placeholder="Select Country"
                    value={
                      countries.find((c) => c.value === field.value) || null
                    }
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={selectStyles}
                    options={states}
                    placeholder="Select State"
                    isDisabled={!country}
                    value={states.find((s) => s.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />

              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <Select
                    styles={selectStyles}
                    options={cities}
                    placeholder="Select City"
                    isDisabled={!state}
                    value={cities.find((c) => c.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value)}
                  />
                )}
              />

              <Input
                placeholder="Pincode"
                register={register("address.pincode")}
                error={errors.address?.pincode?.message}
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-[var(--color-text-primary)] py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Create Account
            </button>

            <Link
              to="/login"
              className="flex items-center justify-center w-full rounded-lg border border-gray-300 py-3 font-medium text-[var(--color-text-primary)] hover:bg-gray-100 transition"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
