// icons.ts
import { ReactComponent as ChevronDownIcon } from "../icons/chevron-down.svg";
import { ReactComponent as ChevronLeftIcon } from "../icons/chevron-left.svg";
import { ReactComponent as EyeIcon } from "../icons/eye.svg";
import { ReactComponent as DeviceDesktopIcon } from "../icons/device-desktop.svg";
import { ReactComponent as DeviceTabletIcon } from "../icons/device-tablet.svg";
import { ReactComponent as DeviceMobileIcon } from "../icons/device-mobile.svg";
import { ReactComponent as DeviceMobileRotatedIcon } from "../icons/device-mobile-rotated.svg";
import { ReactComponent as PackageIcon } from "../icons/package.svg";
import { ReactComponent as UsersIcon } from "../icons/users.svg";
import { ReactComponent as SquarePlusIcon } from "../icons/square-plus.svg";
import { ReactComponent as LayoutIcon } from "../icons/layout.svg";
import { ReactComponent as PaletteIcon } from "../icons/palette.svg";
import { ReactComponent as FileIcon } from "../icons/file.svg";
import { ReactComponent as ImageIcon } from "../icons/image.svg";
import { ReactComponent as AlertCircleIcon } from "../icons/alert-circle.svg";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as AlignBottomIcon } from "../icons/align-bottom.svg";
import { ReactComponent as AlignCenterIcon } from "../icons/align-center.svg";
import { ReactComponent as AlignLeftIcon } from "../icons/align-left.svg";
import { ReactComponent as AlignRightIcon } from "../icons/align-right.svg";
import { ReactComponent as AlignTopIcon } from "../icons/align-top.svg";
import { ReactComponent as AlignMiddleIcon } from "../icons/align-middle.svg";
import { ReactComponent as BarsIcon } from "../icons/bars.svg";
import { ReactComponent as PencilIcon } from "../icons/pencil.svg";
import { ReactComponent as LogoIcon } from "../icons/logo.svg";

type IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export const Icons: { [key: string]: IconType } = {
	ChevronDownIcon,
	ChevronLeftIcon,
	EyeIcon,
	DeviceDesktopIcon,
	DeviceTabletIcon,
	DeviceMobileIcon,
	DeviceMobileRotatedIcon,
	PackageIcon,
	UsersIcon,
	SquarePlusIcon,
	LayoutIcon,
	PaletteIcon,
	FileIcon,
	ImageIcon,
	AlertCircleIcon,
	SettingsIcon,
	AlignBottomIcon,
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	AlignTopIcon,
	AlignMiddleIcon,
	BarsIcon,
	PencilIcon,
	LogoIcon,
};
