<template>
	<div class="mt-16 card rounded-lg bg-white max-w-4xl mx-auto">
		<div class="card-body space-y-2">
			<div class="flex items-center space-x-3">
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
                    <!--  -->
                    <h3 class="text-lg font-medium">
                        Safety
                    </h3>
                </div>
			<div class="mb-5 sm:w-2/3 w-full mx-auto py-3">
				<ul class="space-y-2">
					<!-- <li>
						<a class="!px-0" href="/auth/user/dashboard/contacts/blocked">
							<div class="flex justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
								<span class="text-fatou-black">People you have blocked</span>
								<span
									><svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9 18L15 12L9 6"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</span>
							</div>
						</a>
					</li> -->
                    <li>
						<a class="!px-0" href="/auth/user/dashboard/safety/account/security">
							<div class="flex justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
								<span class="text-fatou-black">Advance Security</span>
								<span
									><svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9 18L15 12L9 6"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</span>
							</div>
						</a>
					</li>
					<li>
						<a class="!px-0" href="/auth/user/dashboard/safety/hide-mode">
							<div class="flex justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                                <span class="text-fatou-black">Hide Mode</span>
								<span
									><svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9 18L15 12L9 6"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</span>
							</div>
						</a>
					</li>
                    <li>
						<a class="!px-0" href="/auth/user/dashboard/safety/account/options">
							<div class="flex justify-between w-full border border-fatou-black-50 px-6 py-2.5 rounded-lg">
                                <span class="text-fatou-black">Account Options</span>
								<span
									><svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9 18L15 12L9 6"
											stroke="black"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</span>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
