#!/bin/bash

# List of files to delete
files=(
    src/components/Footer/ContactUs-footer.js
    src/components/Footer/Privacy.js
    src/components/Footer/Terms.js
    src/components/LoginForm/loginUser.js
    src/components/searchbar/SearchBar.js
    src/components/status/TrackingStatus.js
    src/frontPages/userPages/landing-userPage.js
    src/frontPages/userPages/overviewElements/ElementSidebar/ContactUs.js
    src/frontPages/userPages/overviewElements/ElementSidebar/userInfo.js
    src/frontPages/userPages/overviewElements/ElementSidebar/userTrackingInfo.js
    src/frontPages/userPages/overviewElements/userSidebar.js
    src/frontPages/userPages/overviewUser.js
    src/publicPages/aboutPage.js
    src/publicPages/contact-page.js
    src/publicPages/contact-page/contactUsForm.js
    src/publicPages/landingPage.js
    src/publicPages/landingPage/aboutPage.js
    src/publicPages/landingPage/contact-landing.js
    src/publicPages/landingPage/hero-landing.js
    src/publicPages/landingPage/services-landing.js
    src/publicPages/landingPage/TrackingLanding.js
    src/publicPages/servicesPage.js
    src/publicPages/tracking-page.js
    src/publicPages/trackingPagePublic.js
)

# Optional: Confirm before deleting
echo "Are you sure you want to delete the following files?"
for file in "${files[@]}"
do
    echo "$file"
done
read -p "Type 'yes' to confirm: " confirmation

if [ "$confirmation" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

# Loop through and delete files
for file in "${files[@]}"
do
    if [ -f "$file" ]; then
        rm "$file"
        echo "Deleted: $file"
    else
        echo "File not found: $file"
    fi
done

echo "Operation complete."
