
<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
import { mapActions } from "vuex";

// libs
import Multiselect from "@vueform/multiselect";

export default {
  emits: ["close"],
  components: {
    Multiselect,
  },
  data() {
    return {
      v$: useVuelidate(),
      workOptions: {
        looking: false,
        openToWorkBanner: false,
        openToWorkRemotely: false,
        preferredLocation: [],
        yearsOfExperience: "",
        seeking: false,
        salaryRange: "none",
        resumeUrl: null,
      },
      resumeFileData: null,
      isFileSelected: false,
      isLoading: false,
      isEdit: false,
      locations: ["Remote", "Netherlands", "Uk", "USA", "Nigeria"],
    };
  },
  validations() {
    return {
      workOptions: {
        preferredLocation: {
          required: helpers.withMessage("Location is required", required),
        },
        yearsOfExperience: {
          required: helpers.withMessage(
            "Years of experience is required",
            required
          ),
          numeric: helpers.withMessage("Only numbers are allowed", numeric),
        },
      },
    };
  },
  created() {
    this.getWorkOptions().then((res) => {
      if (res.data.workOption != null) {
        this.workOptions = res.data.workOption;
      }
    });
  },
  methods: {
    ...mapActions(["editWorkOptions", "getWorkOptions"]),
    handleForm() {
      this.isLoading = true;
      const data = { ...this.workOptions };

      // transform to form data
      let formData = new FormData();

      if (this.resumeFileData != null && this.isFileSelected) {
        formData.append("resume", this.resumeFileData);
      }

      formData.append("looking", this.workOptions.looking);
      formData.append("openToWorkBanner", this.workOptions.openToWorkBanner);
      formData.append("preferredLocation", this.workOptions.preferredLocation);
      formData.append("yearsOfExperience", this.workOptions.yearsOfExperience);
      formData.append("seeking", this.workOptions.seeking);
      formData.append(
        "openToWorkRemotely",
        this.workOptions.openToWorkRemotely
      );
      formData.append("salaryRange", this.workOptions.salaryRange);

      this.editWorkOptions(formData)
        .then((res) => {
          setTimeout(() => {
            this.isLoading = !this.isLoading;
            this.isEdit = false;
            this.isFileSelected = false;
            this.resumeFileData = null;
          }, 1000);
		  this.getWorkOptions();
          this.$notify({
            type: "success",
            title: "Success",
            text: "Your work options update was successful...",
          });
        })
        .catch((err) => {
          setTimeout(() => {
            this.isLoading = !this.isLoading;
            this.isEdit = false;
          }, 1000);
          this.$notify({
            type: "error",
            title: "Error",
            text: "Your work options update failed, try again",
          });
        });
    },
    selectFileFromMem() {
      this.$refs.fileSelector.click();
    },
    handleFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.resumeFileData = files[0];
      this.workOptions.resumeUrl = this.resumeFileData.name;
      this.isFileSelected = true;
      this.isEdit = true;
      if (!files.length) return;
    },
  },
};
</script>
<template>
  <!-- -->
  <div id="modal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-opacity-modal opacity-75"></div>
      </div>
      <!--  -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          relative
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full
          z-[1999px]
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <span class="text-2xl font-bold absolute left-5 top-4"
          >Update My Work Options</span
        >
        <div class="absolute right-5 top-4">
          <button
            v-on:click="$emit('close')"
            class="bg-fatou-gray-700 focus:outline-none rounded-full p-1"
          >
            <img src="/images/svg/timesicon.svg" alt="close" />
          </button>
        </div>
        <form @submit.prevent="handleForm">
          <div class="bg-white mx-auto py-10 border-b px-7">
            <div class="p-3 flex flex-col mt-10 gap-y-2">
              <div
                class="
                  flex
                  justify-between
                  border-fatou-gray-300 border-[0.5px]
                  rounded-md
                  font-bold
                  p-4
                  items-center
                "
              >
                Actively looking For work
                <label class="switch">
                  <input
                    type="checkbox"
                    chev-model="workOptions.looking"
                    @change="isEdit = true"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
              <div
                class="
                  flex
                  justify-between
                  border-fatou-gray-300 border-[0.5px]
                  rounded-md
                  font-bold
                  p-4
                  items-center
                "
              >
                Add open for work on profile
                <label class="switch">
                  <input
                    type="checkbox"
                    v-model="workOptions.openToWorkBanner"
                    @change="isEdit = true"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
              <div
                class="
                  flex flex-col
                  items-start
                  space-y-1.5
                  justify-between
                  border-fatou-gray-300 border-[0.5px]
                  rounded-md
                  font-bold
                  p-4
                "
              >
                <span class="">Preferred work location</span>
                <!-- <button class="btn btn-primary rounded-4xl px-10 btn-sm">Add</button> -->
                <div class="w-full">
                  <Multiselect
                    v-model="workOptions.preferredLocation"
                    mode="tags"
                    :searchable="true"
                    :options="locations"
                    @change="isEdit = true"
                    placeholder="Select location"
                  />
                </div>
                <div
                  v-if="v$.workOptions.preferredLocation.$error"
                  class="text-red-600 text-xs"
                >
                  {{
                    "* " + v$.workOptions.preferredLocation.$errors[0].$message
                  }}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  class="
                    w-full
                    focus:outline-none
                    border border-fatou-black-50
                    rounded-md
                    py-3.5
                    px-4
                  "
                  placeholder="Years of experience"
                  v-model.number="v$.workOptions.yearsOfExperience.$model"
                />
                <div
                  v-if="v$.workOptions.yearsOfExperience.$error"
                  class="text-red-600 text-xs"
                >
                  {{
                    "* " + v$.workOptions.yearsOfExperience.$errors[0].$message
                  }}
                </div>
              </div>
              <!-- <div
							class="
								flex
								justify-between
								border-fatou-gray-300 border-[0.5px]
								rounded-md
								font-bold
								p-4
								items-center
							"
						>
							Seeking job
							<label class="switch">
								<input type="checkbox" />
								<span class="slider round"></span>
							</label>
						</div> -->
              <div
                class="
                  flex flex-col
                  justify-between
                  border-fatou-gray-300 border-[0.5px]
                  rounded-md
                  font-bold
                  p-4
                  space-y-1
                "
              >
                <span>Salary Requirement</span>
                 <span>
               <div class="flex items-center flex-grow ml-10">
                  <span class="font-bold text-sm">$500</span>
                  <input
                    type="range"
                    max="50000"
                    min="1000"
                    value="10000"
                    class="range range-white range-sm mx-4"
                  />
                  <span class="font-bold text-sm">$500,000</span>
                </div>
              </span>
                <!-- <select
                  name="salary"
                  class="
                    bg-transparent
                    w-full
                    focus:outline-none
                    border border-fatou-black-50
                    px-6
                    py-3.5
                    rounded-lg
                  "
                  v-model="workOptions.salaryRange"
                  @change="isEdit = true"
                >
                  <option value="none" selected disabled>
                    Select Salary Range <small>(per month)</small>
                  </option>
                  <option value="1500-3500">$1,500 - $3,500</option>
                  <option value="4000-6500">$4,000 - $6,500</option>
                  <option value="7000-1000">$7,000 - $10,000</option>
                  <option value="1000-above">$10,000 Above</option>
                </select> -->
              <!-- <div class="flex items-center flex-grow ml-10">
								<span class="font-bold">$50,000</span>
								<input
									type="range"
									max="100"
									value="0"
									class="range range-white range-sm mx-4"
								/>
								<span class="font-bold">$500,000</span>
							</div> -->
              </div>
              <!-- <div
							class="
								flex
								justify-between
								border-fatou-gray-300 border-[0.5px]
								rounded-md
								font-bold
								p-4
								items-center
							"
						>
							Upload Resume
							<button class="btn btn-primary rounded-4xl px-10 btn-sm">Upload</button>
						</div> -->
              <div
                class="
                  flex
                  justify-between
                  border-fatou-gray-300 border-[0.5px]
                  rounded-md
                  font-bold
                  p-4
                  items-center
                "
              >
                Open to work Remotely
                <label class="switch">
                  <input
                    type="checkbox"
                    v-model="workOptions.openToWorkRemotely"
                    @change="isEdit = true"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="mt-10 flex justify-center gap-x-4">
              <button
                type="submit"
                :disabled="v$.workOptions.$invalid || isLoading || !isEdit"
                class="
                  btn btn-primary
                  rounded-3xl
                  px-7
                  flex
                  items-center
                  justify-center
                  space-x-1
                "
              >
                <div
                v-if="isLoading"
                class="
                h-5
                w-5
                mr-3
                loader
                ease-linear
                rounded-full
                border-2 border-t-2 border-gray-200
                "
              ></div>
               <span>Complete Mentorship Options</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/src/assets/css/modal.css");
@import url("/src/assets/css/switch.css");
</style>
