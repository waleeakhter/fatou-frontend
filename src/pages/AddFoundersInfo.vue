<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import authHeader from "../core/utils/auth.header";
import {
  required,
  helpers,
  url,
  email,
  maxLength,
  numeric,
} from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      founderForm: {
        email: "",
        name: "",
        sector: "",
        founded: "",
        gender: "gender",
        employeeCount: "",
        bio: "",
        foundingRound: "foundingRound",
        additionalFounder: "",
        website: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkdIn: "",
        
        crunchbase: "",

        logo: "",
        user: "",
        hiring: "Hiring?",
      },
    };
  },
  validations() {
    return {
      founderForm: {
        email: {
          required: helpers.withMessage("Email address is required", required),
          email: helpers.withMessage("Must be a valid email", email),
        },
        name: {
          required: helpers.withMessage(
            "please include a company name",
            required
          ),
        },
        sector: {
          required: helpers.withMessage("please include a sector", required),
        },

        gender: {
          required: helpers.withMessage("please include a gender", required),
        },
        founded: {
          required: helpers.withMessage(
            "please include a year founded",
            required
          ),
        },
        foundingRound: {
          required: helpers.withMessage(
            "please include a founding round",
            required
          ),
        },
        employeeCount: {
          required: helpers.withMessage(
            "please include an employee number",
            required
          ),
          max: helpers.withMessage(
            "Employee count cant be more than 1",
            maxLength(1)
          ),
          numeric,
        },
        bio: {
          required: helpers.withMessage("please include a bio", required),
        },
        additionalFounder: {
          required: helpers.withMessage(
            "please include an additional founder",
            required
          ),
        },
        hiring: {
          required: helpers.withMessage(
            "The hiring field is required",
            required
          ),
        },
        user: {
          required: helpers.withMessage("The user field is required", required),
        },

        website: {
          url: helpers.withMessage("Url not valid", url),
        },

        facebook: {
          url: helpers.withMessage("Url not valid", url),
        },
        twitter: {
          url: helpers.withMessage("Url not valid", url),
        },
        instagram: {
          url: helpers.withMessage("Url not valid", url),
        },
        linkdIn: {
          url: helpers.withMessage("Url not valid", url),
        },
        mediaLink: {
          url: helpers.withMessage("Url not valid", url),
        },
        crunchbase: {
          url: helpers.withMessage("Url not valid", url),
        },
      },
    };
  },
  mounted() {
    // load userId and save it in the user  data variable
    var id = authHeader();
    id = id.Authorization.split(" ")[1];
    this.founderForm.user = id;
  },
  methods: {
    onImageSelect(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.founderForm.logo = files[0];
      if (!files.length) return;
    },
    // load map actions form individual modules
    ...mapActions(["createFounder"]),
    addFounder() {
      // instantiate form
      let formData = new FormData();
      // load data body

      formData.append("logo", this.founderForm.logo);
      formData.append("name", this.v$.founderForm.name.$model);
      formData.append("email", this.v$.founderForm.email.$model);
      formData.append("sector", this.v$.founderForm.sector.$model);
      formData.append("founded", this.v$.founderForm.founded.$model);
      formData.append("gender", this.v$.founderForm.gender.$model);
      formData.append("user", this.founderForm.user);
      formData.append(
        "foundingRound",
        this.v$.founderForm.foundingRound.$model
      );
      formData.append(
        "employeeCount",
        this.v$.founderForm.employeeCount.$model
      );
      formData.append("bio", this.v$.founderForm.bio.$model);
      formData.append(
        "additionalFounder",
        this.v$.founderForm.additionalFounder.$model
      );
      formData.append("hiring", this.v$.founderForm.hiring.$model);
      formData.append("website", this.v$.founderForm.website.$model);
      formData.append("facebook", this.v$.founderForm.facebook.$model);
      formData.append("twitter", this.v$.founderForm.twitter.$model);
      formData.append("linkedIn", this.v$.founderForm.linkdIn.$model);
      formData.append("crunchbase", this.v$.founderForm.crunchbase.$model);
      formData.append("instagram", this.v$.founderForm.instagram.$model);

      this.isLoading = !this.isLoading;
      // clear out all input fields
      this.founderForm.email = "";
      this.founderForm.logo = "";
      this.founderForm.name = "";
      this.founderForm.sector = "";
      this.founderForm.founded = "";
      this.founderForm.gender = "gender";
      this.founderForm.employeeCount = "";
      this.founderForm.bio = "";
      this.founderForm.foundingRound = "foundingRound";
      this.founderForm.additionalFounder = "";
      this.founderForm.website = "";
      this.founderForm.facebook = "";
      this.founderForm.instagram = "";
      this.founderForm.twitter = "";
      this.founderForm.linkdIn = "";

      this.founderForm.crunchbase = "";
      this.founderForm.hiring = "Hiring?";
      // send data to the backend
      // debugger
      this.createFounder(formData)
        
        .then((res) => {
         

          //  enable button after one second of positive response
          setTimeout(() => {
            this.isLoading = !this.isLoading;
          }, 1000);
          this.$notify({
            type: "success",
            title: "Success",
            text: "founder created successfully",
          });
        })
        .catch((err) => {
          //  enable button after one second of negative response
          setTimeout(() => {
            this.isLoading = !this.isLoading;
          }, 1000);
          if (err.response && err.response.data && err.response.data.error) {
            this.$notify({
              type: "error",
              title: "Error",
              text: err.response.data.error,
            });
          } else {
            this.$notify({
              type: "error",
              title: "Error",
              text: "Network error, try again",
            });
          }
        });
    },
  },
};
</script>

<template>
  <div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
    <div class="card-body">
      <div class="text-xl font-bold flex items-center mb-4">
        <span @click="$router.back()" class="mr-4 cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        Add Founder's Info
      </div>

      <!--  -->
      <form @submit.prevent="addFounder">
        <div class="py-2">
          <!-- email error -->
          <div v-if="v$.founderForm.email.$error" class="text-red-600 text-xs">
            {{ "* " + v$.founderForm.email.$errors[0].$message }}
          </div>
          <input
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            v-model="v$.founderForm.email.$model"
            placeholder="Email Address"
          />
        </div>
        <div class="py-2">
          <!-- company error -->
          <div v-if="v$.founderForm.name.$error" class="text-red-600 text-xs">
            {{ "* " + v$.founderForm.name.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.name.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Company’s Name"
          />
        </div>
        <div class="py-2">
          <!-- sector error -->
          <div v-if="v$.founderForm.sector.$error" class="text-red-600 text-xs">
            {{ "* " + v$.founderForm.sector.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.sector.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Sector"
          />
        </div>
        <div class="py-2">
          <!--founded error -->
          <div
            v-if="v$.founderForm.founded.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.founded.$errors[0].$message }}
          </div>
          <input
            type="date"
            v-model="v$.founderForm.founded.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Year Founded"
          />
        </div>
        <div class="py-2">
          <!-- gender error -->
          <div v-if="v$.founderForm.gender.$error" class="text-red-600 text-xs">
            {{ "* " + v$.founderForm.gender.$errors[0].$message }}
          </div>
          <select
            v-model="v$.founderForm.gender.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
          >
            <option value="gender" selected disabled>Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="py-2">
          <!-- foundingRound error -->
          <div
            v-if="v$.founderForm.foundingRound.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.foundingRound.$errors[0].$message }}
          </div>
          <select
            v-model="v$.founderForm.foundingRound.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
          >
            <option value="foundingRound" selected disabled>
              foundingRound
            </option>
            <option value="Private">Private</option>
            <option value="Angel">Angel</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B">Series B</option>
            <option value="Series C">Series C</option>
            <option value="Series D">Series D</option>
            <option value="Series E">Series E</option>
            <option value="Series F">Series F</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <div class="py-2">
          <!-- employeeCount error -->
          <div
            v-if="v$.founderForm.employeeCount.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.employeeCount.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.employeeCount.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Number of employeeCount"
          />
        </div>
        <div class="py-2">
          <!-- additionalFounder error -->
          <div
            v-if="v$.founderForm.additionalFounder.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.additionalFounder.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.additionalFounder.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Add additional Founder"
          />
        </div>

        <div class="py-2">
          <!-- bio error -->
          <div v-if="v$.founderForm.bio.$error" class="text-red-600 text-xs">
            {{ "* " + v$.founderForm.bio.$errors[0].$message }}
          </div>
          <textarea
            v-model="v$.founderForm.bio.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            name="bio"
            rows="3"
            placeholder="Brief Bio"
          ></textarea>
        </div>

        <div class="py-2">
          <!-- website error -->
          <div
            v-if="v$.founderForm.website.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.website.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.website.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Website"
          />
        </div>
        <div class="py-2">
          <!-- linkdIn error -->
          <div
            v-if="v$.founderForm.linkdIn.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.linkdIn.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.linkdIn.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="LinkedIn URL"
          />
        </div>
        <div class="py-2">
          <!-- instagram error -->
          <div
            v-if="v$.founderForm.instagram.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.instagram.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.instagram.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Instagram URL"
          />
        </div>
        <div class="py-2">
          <!-- twitter error -->
          <div
            v-if="v$.founderForm.twitter.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.twitter.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.twitter.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="Twitter URL"
          />
        </div>
        <div class="py-2">
          <!-- crunchbase error -->
          <div
            v-if="v$.founderForm.crunchbase.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.crunchbase.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.crunchbase.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeHolder="crunchbase URL"
          />
        </div>
        <div class="py-2">
          <!-- mediaLink error -->
          <div
            v-if="v$.founderForm.facebook.$error"
            class="text-red-600 text-xs"
          >
            {{ "* " + v$.founderForm.facebook.$errors[0].$message }}
          </div>
          <input
            v-model="v$.founderForm.facebook.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            placeholder="facebook URL"
          />
        </div>
        <div class="py-2">
          <!-- hiring error -->
          <div v-if="v$.founderForm.hiring.$error" class="text-red-600 text-xs">
            {{ "* " + v$.founderForm.hiring.$errors[0].$message }}
          </div>
          <select
            v-model="v$.founderForm.hiring.$model"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
          >
            <option value="Hiring?" selected disabled>Hiring?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div class="py-2">
          <input
            @change="onImageSelect"
            accept="image/*"
            type="file"
            ref="file"
            class="
              w-full
              bg-fatou-gray-200
              focus:outline-none
              py-2
              px-3
              border-fatou-gray-400 border-[1px]
              rounded-md
            "
            id="founderFile"
            placeholder="logo"
          />
        </div>
        <div class="w-full py-3.5 flex items-center justify-center">
          <button
            :disabled="isLoading"
            class="
              btn
              bg-fatou-blue
              hover:bg-fatou-blue
              rounded-3xl
              border-0
              text-white
              w-1/2
            "
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
