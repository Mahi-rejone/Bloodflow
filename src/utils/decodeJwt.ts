import { jwtDecode } from "jwt-decode";

 export const decodeToken = (token: string) =>{
    const decoded = jwtDecode(token);
    return decoded
 }






//  <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Username */}
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-app-text mb-2"
//               >
//                 Username
//               </label>

//               <div className="relative">
//                 <UserIcon
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
//                   size={20}
//                 />

//                 <input
//                   id="username"
//                   type="text"
//                   required
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Choose a username"
//                   className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-app-text mb-2"
//               >
//                 Email Address
//               </label>

//               <div className="relative">
//                 <MailIcon
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
//                   size={20}
//                 />

//                 <input
//                   id="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@example.com"
//                   className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-app-text mb-2"
//               >
//                 Password
//               </label>

//               <div className="relative">
//                 <LockIcon
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
//                   size={20}
//                 />

//                 <input
//                   id="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
//                 />
//               </div>
//             </div>

//             {/* Blood Group */}
//             <div>
//               <label
//                 htmlFor="bloodGroup"
//                 className="block text-sm font-medium text-app-text mb-2"
//               >
//                 Blood Group
//               </label>

//               <div className="relative">
//                 <DropletsIcon
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
//                   size={20}
//                 />

//                 <select
//                   id="bloodGroup"
//                   required
//                   value={bloodGroup}
//                   onChange={(e) => setBloodGroup(e.target.value)}
//                   className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all bg-white appearance-none"
//                 >
//                   <option value="" disabled>
//                     Select your blood group
//                   </option>
//                   {BLOOD_GROUPS.map((group) => (
//                     <option key={group} value={group}>
//                       {group}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label
//                 htmlFor="phoneNumber"
//                 className="block text-sm font-medium text-app-text mb-2"
//               >
//                 Phone Number
//               </label>

//               <div className="relative">
//                 <Phone
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
//                   size={20}
//                 />

//                 <input
//                   id="phoneNumber"
//                   type="tel"
//                   required
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   placeholder="01XXXXXXXXX"
//                   className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
//                 />
//               </div>
//             </div>

//             {/* District + Town */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label
//                   htmlFor="district"
//                   className="block text-sm font-medium text-app-text mb-2"
//                 >
//                   District
//                 </label>

//                 <div className="relative">
//                   <MapPin
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
//                     size={20}
//                   />

//                   <input
//                     id="district"
//                     type="text"
//                     required
//                     value={district}
//                     onChange={(e) => setDistrict(e.target.value)}
//                     placeholder="e.g. Dhaka"
//                     className="w-full pl-11 pr-3 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="town"
//                   className="block text-sm font-medium text-app-text mb-2"
//                 >
//                   Town
//                 </label>

//                 <div className="relative">
//                   <MapPin
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
//                     size={20}
//                   />

//                   <input
//                     id="town"
//                     type="text"
//                     required
//                     value={town}
//                     onChange={(e) => setTown(e.target.value)}
//                     placeholder="e.g. Mirpur"
//                     className="w-full pl-11 pr-3 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-app-primary hover:bg-app-primary-dark text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Creating Account..." : "Sign Up"}
//             </button>
//           </form>